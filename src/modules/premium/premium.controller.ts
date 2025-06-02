import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as path from 'path';

import {
  ProspectInput,
  PlanInput,
  RiderInput,
  PremiumProcessor,
} from 'src/lib/main';

interface PremiumCalculationRequest {
  prospect: ProspectInput;
  plans: Array<PlanInput>;
  riders: Array<RiderInput>;
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
    const prospect = request.prospect;
    const plans = request.plans;
    const riders = request.riders;

    const storagePath = path.join(process.cwd(), 'storage.db');

    // build processors
    const premiumProcessor = new PremiumProcessor(prospect, {
      plans,
      riders,
    });

    premiumProcessor.load(storagePath);

    // calculate premium
    const result = premiumProcessor.process();

    return result;
  }
}
