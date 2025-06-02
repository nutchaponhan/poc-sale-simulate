import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  PlanProduct,
  RiderProduct,
  RiderProcessor,
  PlanProcessor,
  Prospect,
  IProspect,
} from 'src/lib/main';

interface PremiumCalculationRequest {
  prospect: IProspect;
  plans: Array<PlanProduct>;
  riders: Array<RiderProduct>;
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
    const prospect = new Prospect(request.prospect);

    // build processors
    const planProcessor = new PlanProcessor();
    const riderProcessor = new RiderProcessor();

    const plans = request.plans;
    const riders = request.riders;

    // calculate premium
    const planPremium = planProcessor.process(prospect, plans);
    const riderPremium = riderProcessor.process(prospect, riders);

    return {
      premium: planPremium + riderPremium,
    };
  }
}
