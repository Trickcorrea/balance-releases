import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { BalanceEntity } from '../../entity/balance.entity';

//DTO Pattern
export class SetDebitDTO implements Pick<BalanceEntity, 'value'> {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  value: number;
}
