import { Inject, Injectable } from '@nestjs/common';
import { BalanceRepositoryInterface } from '../commons/interface/balance-repository.interface';
import { format } from 'date-fns';
import { calculateCurrentBalanceByType } from '../commons/utils/calculate-current-balance';
import { DailyCurrentBalance } from '../commons/type/balance.type';
import { BalanceEntity } from '../entity/balance.entity';

@Injectable()
export class BalanceService {
  constructor(
    @Inject('BalanceRepository')
    private readonly balanceRepository: BalanceRepositoryInterface,
  ) {}

  async getAll(): Promise<BalanceEntity[]> {
    return this.balanceRepository.findAll();
  }

  async getDaily(): Promise<DailyCurrentBalance[]> {
    const balances = await this.balanceRepository.findAll();
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
