import { Test, TestingModule } from '@nestjs/testing';
import { MolliePaymentService } from './molliePayment.service';

describe('MolliePaymentService', () => {
  let service: MolliePaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MolliePaymentService],
    }).compile();

    service = module.get<MolliePaymentService>(MolliePaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
