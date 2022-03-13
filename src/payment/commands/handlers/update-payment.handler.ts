import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';

import { UpdatePaymentCommand } from '../impl';
import { PaymentRepository } from '../../../db/repositories/payment.repository';
import { RpcExceptionService } from '../../../utils/exception-handling';

@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentHandler
  implements ICommandHandler<UpdatePaymentCommand>
{
  constructor(
    @InjectRepository(PaymentRepository)
    private readonly paymentRepository: PaymentRepository,
    private readonly rpcExceptionService: RpcExceptionService,
  ) {}

  async execute(command: UpdatePaymentCommand) {
    const { id, updatedPayment } = command.updatePaymentDto;
    const { newPayment, product } = updatedPayment;
    const { product_id } = newPayment;
    if (!product) {
      this.rpcExceptionService.throwNotFound('Product does not exist');
    }

    try {
      await this.paymentRepository.update({ id }, { product_id });

      const payment = await this.paymentRepository.findOne(id);

      return payment;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
