import { Test, TestingModule } from '@nestjs/testing';
import { RpcExceptionService } from '../utils/exception-handling';
import { MolliePaymentService } from '../mollie/molliePayment.service';
import { PaymentService } from './payment.service';
import { CqrsModule } from '@nestjs/cqrs';

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentService, MolliePaymentService, RpcExceptionService],
      imports: [CqrsModule],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
