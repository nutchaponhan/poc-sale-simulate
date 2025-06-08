import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as path from 'path';

import { PremiumProcessor } from '../../lib/main';
import { BetterSQLiteAdapter } from 'src/utility/sqlite.adapter';
import { ProspectInput } from 'src/lib/core/prospect.input';

interface PremiumCalculationRequest {
  prospect: ProspectInput;
  plans: Array<any>;
  riders: Array<any>;
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
  calculatePremium(
    @Body() request: PremiumCalculationRequest,
  ): PremiumCalculationResponse {
    const storagePath = path.join(process.cwd(), 'storage.db');

    // build processors
    const premiumProcessor = new PremiumProcessor();

    // load storage
    premiumProcessor.load(new BetterSQLiteAdapter(storagePath));

    // calculate premium
    const result = premiumProcessor.process({
      prospect: request.prospect,
      plans: request.plans,
      riders: request.riders,
    });

    return result;
  }
}
