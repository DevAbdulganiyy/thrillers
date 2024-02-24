import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
    HttpStatus,
    Request,
    HttpCode,
    SerializeOptions,
  } from '@nestjs/common';
//   import { CreateUserDto } from './dto/create-user.dto';
//   import { UpdateUserDto } from './dto/update-user.dto';
  import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
  import { Roles } from '../roles/roles.decorator';
  import { RoleEnum } from '../roles/roles.enum';
  import { AuthGuard } from '@nestjs/passport';
  import { RolesGuard } from 'src/roles/roles.guard';
//   import { infinityPagination } from 'src/utils/infinity-pagination';
//   import { InfinityPaginationResultType } from '../utils/types/infinity-pagination-result.type';
  import { NullableType } from '../utils/types/nullable.type';
//   import { QueryUserDto } from './dto/query-user.dto';
//   import { User } from './domain/user';
//   import { UsersService } from './users.service';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { CreateTransactionDto } from './create-transaction.dto';



@ApiBearerAuth()
@Roles(RoleEnum.user)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Transactions')
@Controller({
  path: 'transactions',
  version: '1',
})export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {


        

    }

    @SerializeOptions({
        groups: ['admin','me'],
      })
      @Post()
      @HttpCode(HttpStatus.CREATED)
      create(@Body() createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        // return this.usersService.create(createProfileDto);
        return this.transactionService.create(createTransactionDto)
      }


      @ApiBearerAuth()
      @SerializeOptions({
        groups: ['me'],
      })
      @Get('user')
      @UseGuards(AuthGuard('jwt'))
      @HttpCode(HttpStatus.OK)
      public getUserTransactions(@Request() request): Promise<NullableType<Transaction[]>> {
        console.log(request.user)
        return this.transactionService.getUserTransactions(request?.user?.id);
      }
    
    

}
