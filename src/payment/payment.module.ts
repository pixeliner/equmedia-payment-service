import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommandHandlers } from './commands/handlers';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { QueryHandlers } from './queries/handlers';
import { PaymentEntity } from '../db/repositories/payment.entity';
import { PaymentRepository } from '../db/repositories/payment.repository';
import { RpcExceptionService } from '../utils/exception-handling';
import { MolliePaymentModule } from '../mollie/molliePayment.module';
import { MolliePaymentService } from '../mollie/molliePayment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentRepository, PaymentEntity]),
    CqrsModule,
    MolliePaymentModule,
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    ConfigService,
    RpcExceptionService,
    MolliePaymentService,
    ...QueryHandlers,
    ...CommandHandlers,
  ],
})
export class PaymentModule {}
