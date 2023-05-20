import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { BalanceRepository } from '../repository/balance.repository';
import { EBalanceType } from '../commons/enum/balance-type.enum';
import { ManageReleaseService } from './manage-release.service';
import { BalanceEntity } from '../entity/balance.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('Balance Service', () => {
  let service: ManageReleaseService;
  let balanceRepository: DeepMocked<BalanceRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManageReleaseService,
        {
          provide: 'BalanceRepository',
          useValue: createMock<BalanceRepository>(),
        },
      ],
    }).compile();

    service = module.get<ManageReleaseService>(ManageReleaseService);
    balanceRepository =
      module.get<DeepMocked<BalanceRepository>>('BalanceRepository');
  });

  describe('Set Credit', () => {
    describe('Success Case', () => {
      it('should be return credit balance saved', async () => {
        const payloadToSave = { value: 10 };
        const payloadReturn = {
          id: 1,
          createdAt: new Date(),
          type: EBalanceType.credit,
        };

        balanceRepository.save.mockImplementation((data) =>
          Promise.resolve(Object.assign(data, payloadReturn) as BalanceEntity),
        );

        const creditBalanceSaved = await service.setCredit(payloadToSave);

        expect(creditBalanceSaved).toBeDefined();

        expect(creditBalanceSaved).toHaveProperty('id');
        expect(creditBalanceSaved).toHaveProperty('createdAt');
        expect(creditBalanceSaved).toHaveProperty('type');
        expect(creditBalanceSaved).toHaveProperty('value', payloadToSave.value);

        expect(balanceRepository.save).toBeCalled();
        expect(balanceRepository.save).toBeCalledTimes(1);
      });
    });

    describe('Error Case', () => {
      it('should be show handle HttpException in save credit', async () => {
        const creditBalanceSaved = service.setCredit(undefined);

        await expect(creditBalanceSaved).rejects.toBeInstanceOf(HttpException);
        await expect(creditBalanceSaved).rejects.toThrow(
          new HttpException(
            'Credit payload can not be empty',
            HttpStatus.BAD_REQUEST,
          ),
        );

        expect(balanceRepository.save).not.toBeCalled();
        expect(balanceRepository.save).toBeCalledTimes(0);
      });
    });
  });

  describe('Set Debit', () => {
    describe('Success Case', () => {
      it('should be return debit balance saved', async () => {
        const payloadToSave = { value: 20 };
        const payloadReturn = {
          id: 1,
          createdAt: new Date(),
          type: EBalanceType.debit,
        };

        balanceRepository.save.mockImplementation((data) =>
          Promise.resolve(Object.assign(data, payloadReturn) as BalanceEntity),
        );

        const debitBalanceSaved = await service.setDebit(payloadToSave);

        expect(debitBalanceSaved).toBeDefined();

        expect(debitBalanceSaved).toHaveProperty('id');
        expect(debitBalanceSaved).toHaveProperty('createdAt');
        expect(debitBalanceSaved).toHaveProperty('type');
        expect(debitBalanceSaved).toHaveProperty('value', payloadToSave.value);

        expect(balanceRepository.save).toBeCalled();
        expect(balanceRepository.save).toBeCalledTimes(1);
      });
    });

    describe('Error Case', () => {
      it('should be show handle HttpException in save debit', async () => {
        const debitBalanceSaved = service.setDebit(undefined);

        await expect(debitBalanceSaved).rejects.toBeInstanceOf(HttpException);
        await expect(debitBalanceSaved).rejects.toThrow(
          new HttpException(
            'Debit payload can not be empty',
            HttpStatus.BAD_REQUEST,
          ),
        );

        expect(balanceRepository.save).not.toBeCalled();
        expect(balanceRepository.save).toBeCalledTimes(0);
      });
    });
  });
});
