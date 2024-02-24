import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './create-transaction.dto';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity as User } from 'src/users/infrastructure/persistence/relational/entities/user.entity';
import { UsersService } from 'src/users/users.service';



@Injectable()
export class TransactionService {
    constructor(    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    private usersService:UsersService){}

    async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        // return this.usersService.create(createProfileDto);
        const sender = await this.usersService.findOne({id:createTransactionDto.sender})
        const receiver = await this.usersService.findOne({id:createTransactionDto.receiver})

        await this.usersService.update(createTransactionDto.sender,{credits:sender?.credits as unknown as number - createTransactionDto.amount})
        await this.usersService.update(createTransactionDto.receiver,{credits:receiver?.credits as unknown as number + createTransactionDto.amount})


        return this.transactionRepository.save(this.transactionRepository.create({
           amount:createTransactionDto.amount,
           ttype:createTransactionDto.ttype,
            sender:{
                id:createTransactionDto.sender
            } as unknown as User,
            receiver:{
                id:createTransactionDto.receiver
            } as unknown as User,
        }))
      }


      getUserTransactions(userId:string):Promise<Transaction[]>{
        console.log(userId)
        return this.transactionRepository.find({
            where:[{sender:{id:userId} as unknown as User},{receiver:{id:userId} as unknown as User}]
        })
      }
}
