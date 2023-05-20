import { BalanceDTO } from '../dto/balance.dto';

export type DailyCurrentBalance = {
  currentValue: number;
  date: Date;
  history: BalanceDTO[];
};
