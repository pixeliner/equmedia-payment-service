import {
  IsString,
  ValidateNested,
  IsUUID,
  IsEnum,
  ValidateIf,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { currencies, sequenceTypes } from 'src/payment/constants/constants';

class MollieMetadata {
  @IsUUID('4')
  product_id: string;

  @IsString()
  product_type: string;
}

class MollieAmount {
  @IsString()
  value: string;

  @IsEnum(currencies)
  currency: string;
}

export class CreatePaymentDto {
  @ValidateNested()
  amount: MollieAmount;

  @IsString()
  description: string;

  @IsString()
  redirectUrl: string;

  @IsString()
  webhookUrl: string;

  @IsOptional()
  @IsEnum(sequenceTypes)
  sequenceType: string;

  @ValidateIf(
    (o) => o.sequenceType === sequenceTypes.recurring && o.mandateId === null,
  )
  @IsNotEmpty()
  customerId: string;

  @ValidateIf(
    (o) => o.sequenceType === sequenceTypes.recurring && o.customerId === null,
  )
  @IsNotEmpty()
  mandateId: string;

  @ValidateNested()
  metadata: MollieMetadata;
}
