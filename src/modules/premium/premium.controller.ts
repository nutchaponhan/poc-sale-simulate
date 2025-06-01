import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Premium')
@Controller('premium')
export class PremiumController {
  @Get()
  @ApiOperation({ summary: 'Calculate premium' })
  calculatePremium() {
    return {
      premium: 100,
    };
  }
}
