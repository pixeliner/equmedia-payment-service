import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MollieModule } from '@sdgoij/nestjs-mollie';

import { MolliePaymentService } from './molliePayment.service';

@Module({
  imports: [
    MollieModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('MOLLIE_API_KEY'),
      }),
    }),
  ],
  controllers: [],
  providers: [MolliePaymentService, ConfigService],
})
export class MolliePaymentModule {}
