import { BalanceDTO } from '../dto/balance.dto';

//ISP - SOLID
export type DailyCurrentBalance = {
  currentBalance: number;
  date: Date;
  history: BalanceDTO[];
};
