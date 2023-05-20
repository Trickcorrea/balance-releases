import { BalanceEntity } from '../../entity/balance.entity';

//Repository Pattern
export interface BalanceRepositoryInterface {
  findAll: () => BalanceEntity[];
  findOne: (id: number) => BalanceEntity;
  save: (entity: Partial<BalanceEntity>) => BalanceEntity;
}
