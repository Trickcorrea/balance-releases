import { BalanceDTO } from '../dto/balance.dto';

export type DailyCurrentBalance = {
  currentBalance: number;
  date: Date;
  history: BalanceDTO[];
};
