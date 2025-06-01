import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IProduct, RiderProcessor, PlanProcessor } from 'src/lib/main';

interface PremiumCalculationRequest {
  plans: Array<IProduct>;
  riders: Array<IProduct>;
}

interface PremiumCalculationResponse {
  premium: number;
}

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
    // build processors
    const riderProcessor = new RiderProcessor();
    const planProcessor = new PlanProcessor();

    const plans = request.plans;
    const riders = request.riders;

    // calculate premium
    const planPremium = planProcessor.process(plans);
    const riderPremium = riderProcessor.process(riders);

    return {
      premium: planPremium + riderPremium,
    };
  }
}
