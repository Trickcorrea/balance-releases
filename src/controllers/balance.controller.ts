import { Controller, Get, HttpStatus } from '@nestjs/common';
import { BalanceService } from '../services/balance.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BalanceDTO } from '../commons/dto/balance.dto';
import { DailyBalanceDTO } from '../commons/dto/daily-balance.dto';

@Controller('balance')
@ApiTags('Balance')
export class BalanceController {
  //SRP - SOLID
  //DIP - SOLID
  constructor(private readonly balanceService: BalanceService) {}

  @Get()
  @ApiOperation({ summary: 'Get All Balance Releases' })
  @ApiResponse({ status: HttpStatus.OK, type: BalanceDTO, isArray: true })
  getAll() {
    return this.balanceService.getAll();
  }

  @Get('daily')
  @ApiOperation({ summary: 'Get All Daily Releases of Balance' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DailyBalanceDTO,
    isArray: true,
  })
  getDaily() {
    return this.balanceService.getDaily();
  }
}
