import { IsNotEmpty, IsNumber } from 'class-validator';
import { BalanceEntity } from '../../entity/balance.entity';
import { ApiProperty } from '@nestjs/swagger';

//DTO Pattern
export class SetCreditDTO implements Pick<BalanceEntity, 'value'> {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  value: number;
}
