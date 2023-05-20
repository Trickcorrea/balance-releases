import { ApiProperty } from '@nestjs/swagger';
import { BalanceDTO } from './balance.dto';
import { DailyCurrentBalance } from '../type/balance.type';

export class DailyBalanceDTO implements DailyCurrentBalance {
  @ApiProperty()
  currentValue: number;

  @ApiProperty()
  date: Date;

  @ApiProperty({ type: BalanceDTO, isArray: true })
  history: BalanceDTO[];
}
