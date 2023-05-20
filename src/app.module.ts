import { Module } from '@nestjs/common';
import { BalanceController } from './controllers/balance.controller';
import { ManageReleaseController } from './controllers/manage-release.controller';
import { BalanceRepository } from './repository/balance.repository';
import { BalanceService } from './services/balance.service';
import { ManageReleaseService } from './services/manage-release.service';

@Module({
  imports: [],
  controllers: [BalanceController, ManageReleaseController],
  providers: [
    BalanceService,
    ManageReleaseService,
    BalanceRepository,
    { provide: 'BalanceRepository', useClass: BalanceRepository },
  ],
})
export class AppModule {}
