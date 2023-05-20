import { BalanceEntity } from '../../entity/balance.entity';

//Repository Pattern
export interface BalanceRepositoryInterface {
  findAll: () => Promise<BalanceEntity[]>;
  save: (entity: Partial<BalanceEntity>) => Promise<BalanceEntity>;
}
