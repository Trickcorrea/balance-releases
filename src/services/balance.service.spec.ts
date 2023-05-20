import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import { BalanceRepository } from '../repository/balance.repository';
import { EBalanceType } from '../commons/enum/balance-type.enum';

describe('Balance Service', () => {
  let service: BalanceService;
  let balanceRepository: DeepMocked<BalanceRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BalanceService,
        {
          provide: 'BalanceRepository',
          useValue: createMock<BalanceRepository>(),
        },
      ],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
    balanceRepository =
      module.get<DeepMocked<BalanceRepository>>('BalanceRepository');
  });

  describe('Get All Balances', () => {
    it('should be return all balances', async () => {
      balanceRepository.findAll.mockResolvedValue([
        {
          id: 1,
          createdAt: new Date(),
          value: 2.5,
          type: EBalanceType.credit,
        },
      ]);

      const balances = await service.getAll();

      expect(balances).toBeDefined();
      expect(balances).toHaveProperty('length');
      expect(balances.length).toBeGreaterThan(0);

      expect(balanceRepository.findAll).toBeCalled();
      expect(balanceRepository.findAll).toBeCalledTimes(1);

      for (const balance of balances) {
        expect(balance).toHaveProperty('id');
        expect(balance).toHaveProperty('createdAt');
        expect(balance).toHaveProperty('value');
        expect(balance).toHaveProperty('type');
      }
    });
  });

  describe('Get Daily Balances', () => {
    it('should be return all daily balances', async () => {
      balanceRepository.findAll.mockResolvedValue([
        {
          id: 1,
          createdAt: new Date(),
          value: 2.5,
          type: EBalanceType.credit,
        },
      ]);

      const dailyBalances = await service.getDaily();

      expect(dailyBalances).toBeDefined();
      expect(dailyBalances).toHaveProperty('length');
      expect(dailyBalances.length).toBeGreaterThan(0);

      expect(balanceRepository.findAll).toBeCalled();
      expect(balanceRepository.findAll).toBeCalledTimes(1);

      for (const dailyBalance of dailyBalances) {
        expect(dailyBalance).toHaveProperty('currentBalance');
        expect(dailyBalance).toHaveProperty('date');
        expect(dailyBalance).toHaveProperty('history');
      }
    });

    it('should be return all daily balances calculated', async () => {
      const valueId1 = 10;
      const valueId2 = 9;
      const totalResult = valueId1 - valueId2;

      const resultFindAll = [
        {
          id: 1,
          createdAt: new Date(),
          value: valueId1,
          type: EBalanceType.credit,
        },
        {
          id: 2,
          createdAt: new Date(),
          value: valueId2,
          type: EBalanceType.debit,
        },
      ];

      balanceRepository.findAll.mockResolvedValue(resultFindAll);

      const dailyBalances = await service.getDaily();

      expect(dailyBalances).toBeDefined();
      expect(dailyBalances).toHaveProperty('length');
      expect(dailyBalances.length).toBeGreaterThan(0);

      expect(balanceRepository.findAll).toBeCalled();
      expect(balanceRepository.findAll).toBeCalledTimes(1);

      for (const dailyBalance of dailyBalances) {
        expect(dailyBalance).toHaveProperty('currentBalance');
        expect(dailyBalance).toHaveProperty('date');
        expect(dailyBalance).toHaveProperty('history');

        expect(dailyBalance.currentBalance).toEqual(totalResult);

        expect(dailyBalance.history).toHaveProperty('length');
        expect(dailyBalance.history.length).toEqual(resultFindAll.length);
      }
    });
  });
});
