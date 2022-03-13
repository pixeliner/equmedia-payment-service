import { IsEnum, IsString, IsUUID } from 'class-validator';
import { currencies } from '../constants/constants';

class Payment {
  @IsUUID('4')
  product_id: string;

  @IsString()
  product_type: string;

  @IsString()
  description: string;

  @IsString()
  amount: string;

  @IsString()
  redirectUrl: string;

  @IsString()
  webhookUrl: string;

  @IsEnum(currencies)
  currency: string;
}

class Product {}

export class CreatePaymentDto {
  newPayment: Payment;
  product: Product;
}
