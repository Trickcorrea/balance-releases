import { BalanceEntity } from '../entity/balance.entity';
import { BalanceRepositoryInterface } from '../commons/interface/balance-repository.interface';
import { EBalanceType } from 'src/commons/enum/balance-type.enum';

// Repository Pattern
export class BalanceRepository implements BalanceRepositoryInterface {
  private readonly db: BalanceEntity[] = [
    {
      id: 1,
      createdAt: new Date('2023-05-19'),
      value: 10.5,
      type: EBalanceType.credit,
    },
    {
      id: 2,
      createdAt: new Date('2023-05-19'),
      value: 12.5,
      type: EBalanceType.credit,
    },
    {
      id: 3,
      createdAt: new Date('2023-05-20'),
      value: 10.5,
      type: EBalanceType.debit,
    },
    {
      id: 4,
      createdAt: new Date('2023-05-20'),
      value: 10.5,
      type: EBalanceType.debit,
    },
    {
      id: 5,
      createdAt: new Date('2023-05-20'),
      value: 2.5,
      type: EBalanceType.debit,
    },
    {
      id: 5,
      createdAt: new Date('2023-05-20'),
      value: 1.0,
      type: EBalanceType.credit,
    },
  ];

  findAll() {
    return this.db;
  }

  findOne(id: number) {
    return this.db.find((item) => item.id === id);
  }

  save(balance: Partial<BalanceEntity>) {
    const balanceCreated = {
      id: this.db.length + 1,
      createdAt: new Date(),
      ...balance,
    } as BalanceEntity;

    this.db.push(balanceCreated);

    return balanceCreated;
  }
}
