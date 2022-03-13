import { Injectable } from '@nestjs/common';
import { MollieClient, SequenceType } from '@mollie/api-client';

import { CreatePaymentDto } from './dto';

@Injectable()
export class MolliePaymentService {
  constructor(private readonly mollieClient: MollieClient) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<any> {
    return this.mollieClient.payments.create({
      amount: createPaymentDto.amount,
      description: createPaymentDto.description,
      redirectUrl: createPaymentDto.redirectUrl,
      webhookUrl: createPaymentDto.webhookUrl,
      sequenceType: createPaymentDto.sequenceType as SequenceType,
      metadata: createPaymentDto.metadata,
    });
  }
}
