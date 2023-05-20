import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SetCreditDTO } from '../commons/dto/set-credit.dto';
import { SetDebitDTO } from '../commons/dto/set-debit.dto';
import { ManageReleaseService } from '../services/manage-release.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HandleErrorDTO } from 'src/commons/dto/handle-error.dto';
import { BalanceDTO } from 'src/commons/dto/balance.dto';

@Controller('manage-release')
@ApiTags('Manage Release')
export class ManageReleaseController {
  // DIP of SOLID
  constructor(private readonly manageReleaseService: ManageReleaseService) {}

  @Post('set-credit')
  @ApiOperation({ summary: 'Add New Credit value' })
  @ApiBody({
    required: true,
    type: SetCreditDTO,
    description: 'Add the value of credit',
  })
  @ApiResponse({ status: HttpStatus.OK, type: BalanceDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HandleErrorDTO })
  setCredit(@Body() setCreditDTO: SetCreditDTO) {
    return this.manageReleaseService.setCredit(setCreditDTO);
  }

  @Post('set-debit')
  @ApiOperation({ summary: 'Add New Debit value' })
  @ApiBody({
    required: true,
    type: SetDebitDTO,
    description: 'Add the value of debit',
  })
  @ApiResponse({ status: HttpStatus.OK, type: BalanceDTO })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: HandleErrorDTO })
  setDebit(@Body() setDebitDTO: SetDebitDTO) {
    return this.manageReleaseService.setDebit(setDebitDTO);
  }
}
