import { ApiProperty } from '@nestjs/swagger';
import { BalanceEntity } from '../../entity/balance.entity';
import { EBalanceType } from '../enum/balance-type.enum';

export class BalanceDTO implements BalanceEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  value: number;

  @ApiProperty({ enum: EBalanceType })
  type: EBalanceType;

  @ApiProperty()
  createdAt: Date;
}
