import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ example: '300' })
  @IsNotEmpty()
  amount: number;

  @ApiProperty({example:"debit"})
  @IsNotEmpty()
  ttype: string;

  @ApiProperty({ example: '2' })
  @IsNotEmpty()
  sender: string;

  @ApiProperty({ example: '3' })
  @IsNotEmpty()
  receiver: string;
}
