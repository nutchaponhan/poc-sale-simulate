import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PremiumService, Products } from './premium.service';

import { RiderCalculator } from 'src/lib/rider/rider-calculator';

interface PremiumCalculationRequest {
  products: Array<Products>;
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
    // build calculators
    const riderCalculator = new RiderCalculator();

    // build services
    const riderPremiumService = new PremiumService(riderCalculator);

    // calculate premium
    const riderPremium = riderPremiumService.calculatePremium(request.products);

    return {
      premium: riderPremium,
    };
  }
}
