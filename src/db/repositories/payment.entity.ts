import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PaymentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @Column()
  product_type: string;

  @Column()
  created_at: Date;

  @Column()
  amount: string;

  @Column()
  currency: string;

  @Column()
  mollie_id: string;

  @Column()
  mollie_status: string;
}
