import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { CreatePaymentCommand } from '../impl';
import { PaymentRepository } from '../../../db/repositories/payment.repository';
import { RpcExceptionService } from '../../../utils/exception-handling';
import { MolliePaymentService } from '../../../mollie/molliePayment.service';
import { currencies } from 'src/payment/constants/constants';

const defaultCurrency = currencies.eur;

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler
  implements ICommandHandler<CreatePaymentCommand>
{
  constructor(
    @InjectRepository(PaymentRepository)
    private readonly paymentRepository: PaymentRepository,
    private readonly rpcExceptionService: RpcExceptionService,
    private readonly molliePaymentService: MolliePaymentService,
  ) {}

  async execute(command: CreatePaymentCommand) {
    const { newPayment, product } = command.createPaymentDto;
    const { product_id, product_type } = newPayment;
    if (!product) {
      this.rpcExceptionService.throwNotFound('Product does not exist');
    }

    const payment = this.paymentRepository.create();

    payment.product_id = product_id;
    payment.created_at = new Date();
    payment.amount = newPayment.amount;
    payment.currency = defaultCurrency;

    const { id: mollieId, status: mollieStatus } =
      await this.molliePaymentService.createPayment({
        amount: {
          value: payment.amount,
          currency: defaultCurrency,
        },
        description: newPayment.description,
        sequenceType: null,
        customerId: null,
        mandateId: null,
        redirectUrl: newPayment.redirectUrl,
        webhookUrl: newPayment.webhookUrl,
        metadata: { product_id, product_type },
      });

    payment.mollie_id = mollieId;
    payment.mollie_status = mollieStatus;

    try {
      await payment.save();
      return payment;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
