import { EBalanceType } from '../enum/balance-type.enum';

export const calculateCurrentBalanceByType = (
  currentBalance: number,
  newBalance: number,
  type: string,
) => {
  if (type === EBalanceType.credit) return currentBalance + newBalance;

  if (type === EBalanceType.debit) return currentBalance - newBalance;
};
