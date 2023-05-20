import { BalanceEntity } from '../../entity/balance.entity';

//Repository Pattern
//ISP - SOLID
export interface BalanceRepositoryInterface {
  findAll: () => Promise<BalanceEntity[]>;
  save: (entity: Partial<BalanceEntity>) => Promise<BalanceEntity>;
}
