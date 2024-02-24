import { registerAs } from '@nestjs/config';
import { TransactionConfig } from './transaction-config-type';
import { IsInt } from 'class-validator';
import validateConfig from '../../utils/validate-config';

class EnvironmentVariablesValidator {
  @IsInt()
  TRANSACTION_FEE: number;
}

export default registerAs<TransactionConfig>('transaction', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    fee: process.env.TRANSACTION_FEE
      ? parseInt(process.env.TRANSACTION_FEE, 10)
      : 1,
  };
});
