import { EBalanceType } from '../commons/enum/balance-type.enum';

export class BalanceEntity {
  id: number;
  value: number;
  type: EBalanceType;
  createdAt: Date;
}
