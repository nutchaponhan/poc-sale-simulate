import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Products, RiderProcessor } from 'src/lib/main';

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
    // build services
    const riderProcessor = new RiderProcessor();

    // calculate premium
    const riderPremium = riderProcessor.process(request.products);

    return {
      premium: riderPremium,
    };
  }
}
