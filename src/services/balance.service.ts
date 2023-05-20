import { Inject, Injectable } from '@nestjs/common';
import { BalanceRepositoryInterface } from '../commons/interface/balance-repository.interface';
import { format } from 'date-fns';
import { calculateCurrentBalanceByType } from '../commons/utils/calculate-current-balance';
import { DailyCurrentBalance } from '../commons/type/balance.type';

@Injectable()
export class BalanceService {
  constructor(
    @Inject('BalanceRepository')
    private readonly balanceRepository: BalanceRepositoryInterface,
  ) {}

  getAll() {
    return this.balanceRepository.findAll();
  }

  getDaily(): DailyCurrentBalance[] {
    const balances = this.balanceRepository.findAll();
    const key = 'createdAt';

    return balances.reduce((result, item) => {
      const data = [];
      let isDay = false;

      const property = format(item[key], 'dd-MM-yyyy');

      if (result && result.length) {
        for (const resultItem of result) {
          if (resultItem.date === property) {
            resultItem.currentBalance = calculateCurrentBalanceByType(
              resultItem.currentBalance,
              item.value,
              item.type,
            );
            resultItem.history.push(item);
            isDay = true;
          }
        }
      }

      data.push(...result);

      if (!(result && result.length) || !isDay) {
        data.push({
          currentBalance: item.value,
          date: property,
          history: [item],
        });
      }

      return data;
    }, []);
  }
}
