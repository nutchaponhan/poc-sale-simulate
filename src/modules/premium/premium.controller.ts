import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as path from 'path';

import { BetterSQLiteAdapter, DB } from 'src/utility/sqlite.adapter';
import { Processor } from '../../lib/main';
import { IPlanInput, IProspectInput, IRiderInput } from '../../lib/interface';

interface PremiumCalculationRequest {
  prospect: {
    gender: 'M' | 'F';
    birthDate: string;
    occgroup: 2;
    occupationType: '2';
    paymentMode: 4;
  };
  plan: {
    code: string;
    premium?: number;
    assure?: number;
    previous?: {
      premium?: number;
      assure?: number;
    };
  };
  rider: Array<{
    code: string;
    premium?: number;
    assure?: number;
    previous?: {
      premium?: number;
      assure?: number;
    };
  }>;
}

type PremiumCalculationResponse = any;

@ApiTags('Premium')
@Controller('premium')
export class PremiumController {
  constructor() {}

  @Post('calculate')
  @ApiOperation({ summary: 'Calculate premium including riders' })
  @ApiResponse({
    status: 200,
    description: 'Premium calculation successful',
  })
  async calculatePremium(
    @Body() request: PremiumCalculationRequest,
  ): Promise<PremiumCalculationResponse> {
    const storagePath = path.join(process.cwd(), 'storage.db');

    // build processor
    const processor = new Processor();

    const sqliteDbAdapter = new BetterSQLiteAdapter(storagePath);
    const db = DB.getInstance(sqliteDbAdapter);

    await db.initializeTables();

    const prospectInput: IProspectInput = {
      gender: request.prospect.gender,
      birthDate: request.prospect.birthDate,
      occupationType: request.prospect.occupationType,
      paymentMode: request.prospect.paymentMode,
    };

    const planInput: IPlanInput = {
      ...request.plan,
      productConfig: await db.get(request.plan.code, 'PRODUCT'),
      rateConfig: await db.get(request.plan.code, 'RATE'),
      previous: request.plan.previous,
    };

    const ridersInput = await request.rider.reduce<
      Promise<Record<string, IRiderInput>>
    >(async (riders, r) => {
      const riderProductConfig = await db.get(r.code, 'PRODUCT');
      const riderRateConfig = await db.get(r.code, 'RATE');

      return {
        ...(await riders),
        [r.code]: {
          ...r,
          productConfig: riderProductConfig,
          rateConfig: riderRateConfig,
          previous: r.previous,
        },
      };
    }, Promise.resolve({}));

    // calculate premium
    const result = processor.process({
      prospect: prospectInput,
      plan: planInput,
      rider: ridersInput,
    });

    return result;
  }
}
