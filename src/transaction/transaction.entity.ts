import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
//   import { EntityHelper } from '../../utils/entity-helper';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { UserEntity as User } from 'src/users/infrastructure/persistence/relational/entities/user.entity';

@Entity({ name: 'transaction' })
export class Transaction extends EntityRelationalHelper {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: Number, nullable: true })
  amount: number | null;

  @Column({ type: String, nullable: true })
  ttype: string | null;

  @ApiProperty({ type: () => User })
  @IsOptional()
  @ManyToOne(() => User, {
    eager: true,
  })
  sender: User | null;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, {
    eager: true,
  })
  receiver: User | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
