import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SetCreditDTO } from '../commons/dto/set-credit.dto';
import { SetDebitDTO } from '../commons/dto/set-debit.dto';
import { BalanceRepositoryInterface } from '../commons/interface/balance-repository.interface';
import { EBalanceType } from '../commons/enum/balance-type.enum';
import { BalanceEntity } from '../entity/balance.entity';

//SRP - SOLID
//DIP - SOLID
@Injectable()
export class ManageReleaseService {
  constructor(
    @Inject('BalanceRepository')
    private readonly balanceRepository: BalanceRepositoryInterface,
  ) {}

  async setCredit(setCreditDTO: SetCreditDTO): Promise<BalanceEntity> {
    if (!setCreditDTO) {
      throw new HttpException(
        'Credit payload can not be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.balanceRepository.save({
      ...setCreditDTO,
      type: EBalanceType.credit,
    });
  }

  async setDebit(setDebitDTO: SetDebitDTO): Promise<BalanceEntity> {
    if (!setDebitDTO) {
      throw new HttpException(
        'Debit payload can not be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.balanceRepository.save({
      ...setDebitDTO,
      type: EBalanceType.debit,
    });
  }
}
