import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from './config/app.config';
import { HealthModule } from './modules/health/health.module';
import { PremiumModule } from './modules/premium/premium.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    HealthModule,
    PremiumModule,
  ],
})
export class AppModule {}
