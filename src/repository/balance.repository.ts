import { BalanceEntity } from '../entity/balance.entity';
import { BalanceRepositoryInterface } from '../commons/interface/balance-repository.interface';
import { EBalanceType } from '../commons/enum/balance-type.enum';

// Repository Pattern
// SRP - SOLID
export class BalanceRepository implements BalanceRepositoryInterface {
  findOne: (id: number) => Promise<BalanceEntity>;
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

  async findAll() {
    return Promise.resolve(this.db);
  }

  async save(balance: Partial<BalanceEntity>) {
    const balanceCreated = {
      id: this.db.length + 1,
      createdAt: new Date(),
      ...balance,
    } as BalanceEntity;

    await Promise.resolve(this.db.push(balanceCreated));

    return balanceCreated;
  }
}
