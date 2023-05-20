import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { EBalanceType } from '../src/commons/enum/balance-type.enum';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
  });

  describe('Release Credit', () => {
    describe('Success Case', () => {
      it('/manage-release/set-credit (POST)', async () => {
        const payloadToSend = { value: 20.5 };

        const { body } = await request(app.getHttpServer())
          .post('/manage-release/set-credit')
          .send(payloadToSend)
          .expect(201);

        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('value', payloadToSend.value);
        expect(body).toHaveProperty('type', EBalanceType.credit);
        expect(body).toHaveProperty('createdAt');
      });
    });

    describe('Error Case', () => {
      it('/manage-release/set-credit (POST) - (BAD_REQUEST)', async () => {
        const { body } = await request(app.getHttpServer())
          .post('/manage-release/set-credit')
          .send()
          .expect(400);

        expect(body).toHaveProperty('statusCode', HttpStatus.BAD_REQUEST);
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('error');
      });
    });
  });

  describe('Release Debit', () => {
    describe('Success Case', () => {
      it('/manage-release/set-debit (POST)', async () => {
        const payloadToSend = { value: 10.0 };

        const { body } = await request(app.getHttpServer())
          .post('/manage-release/set-debit')
          .send(payloadToSend)
          .expect(201);

        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('value', payloadToSend.value);
        expect(body).toHaveProperty('type', EBalanceType.debit);
        expect(body).toHaveProperty('createdAt');
      });
    });

    describe('Error Case', () => {
      it('/manage-release/set-debit (POST) - (BAD_REQUEST)', async () => {
        const { body } = await request(app.getHttpServer())
          .post('/manage-release/set-debit')
          .send()
          .expect(400);

        expect(body).toHaveProperty('statusCode', HttpStatus.BAD_REQUEST);
        expect(body).toHaveProperty('message');
        expect(body).toHaveProperty('error');
      });
    });
  });

  describe('Get All Balance', () => {
    it('/balance (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/balance')
        .expect(200);

      for (const balanceResponse of body) {
        expect(balanceResponse).toHaveProperty('id');
        expect(balanceResponse).toHaveProperty('value');
        expect(balanceResponse).toHaveProperty('type');
        expect(balanceResponse).toHaveProperty('createdAt');
      }
    });
  });

  describe('Get All Daily Balances', () => {
    it('/balance/daily (GET)', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/balance/daily')
        .expect(200);

      expect(body).toBeDefined();
      expect(body).toHaveProperty('length');
      expect(body.length).toBeGreaterThan(0);

      for (const response of body) {
        expect(response).toHaveProperty('currentBalance');
        expect(response).toHaveProperty('date');
        expect(response).toHaveProperty('history');

        expect(response.history).toHaveProperty('length');
        expect(response.history.length).toBeGreaterThan(0);
      }
    });
  });
});
