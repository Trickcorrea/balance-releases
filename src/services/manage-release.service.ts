import { Inject, Injectable } from '@nestjs/common';
import { SetCreditDTO } from '../commons/dto/set-credit.dto';
import { SetDebitDTO } from '../commons/dto/set-debit.dto';
import { BalanceRepositoryInterface } from 'src/commons/interface/balance-repository.interface';
import { EBalanceType } from 'src/commons/enum/balance-type.enum';

@Injectable()
export class ManageReleaseService {
  constructor(
    @Inject('BalanceRepository')
    private readonly balanceRepository: BalanceRepositoryInterface,
  ) {}

  setCredit(setCreditDTO: SetCreditDTO) {
    return this.balanceRepository.save({
      ...setCreditDTO,
      type: EBalanceType.credit,
    });
  }

  setDebit(setDebitDTO: SetDebitDTO) {
    return this.balanceRepository.save({
      ...setDebitDTO,
      type: EBalanceType.debit,
    });
  }
}
