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
    sumAssure?: number;
    previous?: {
      premium?: number;
      sumAssure?: number;
    };
  };
  rider: Array<{
    code: string;
    premium?: number;
    sumAssure?: number;
    previous?: {
      premium?: number;
      sumAssure?: number;
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

    const planProductRow = await db.get<{
      code: string;
      category: string;
      value: any;
    }>('SELECT * FROM plan_product WHERE code = ?', [request.plan.code]);

    const planInput: IPlanInput = {
      code: request.plan.code,
      data: JSON.parse(planProductRow.value),
      current: {
        premium: request.plan.premium,
        sumAssure: request.plan.sumAssure,
      },
      previous: request.plan.previous,
    };

    const ridersInput = await request.rider.reduce<
      Promise<Record<string, IRiderInput>>
    >(async (riders, r) => {
      const riderProductRow = await db.get<{
        code: string;
        category: string;
        value: any;
      }>('SELECT * FROM rider_product WHERE code = ?', [r.code]);

      const riderProduct = JSON.parse(riderProductRow.value);

      return {
        ...(await riders),
        [r.code]: {
          code: r.code,
          data: riderProduct,
          current: {
            premium: r.premium,
            sumAssure: r.sumAssure,
          },
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
