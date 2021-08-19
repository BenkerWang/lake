import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('SourceController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/source (POST)', () => {
    it('should return validate error', () => {
      const sourceWithoutType = {
        options: {},
      };
      return request(app.getHttpServer())
        .post('/source')
        .send(sourceWithoutType)
        .expect(400)
        .expect((res) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should return validate error 2', () => {
      const sourceWithoutType = {
        type: 'github',
        options: {},
      };
      return request(app.getHttpServer())
        .post('/source')
        .send(sourceWithoutType)
        .expect(400)
        .expect((res) => {
          expect(res.body).toMatchSnapshot();
        });
    });

    it('should return validate error 3', () => {
      const sourceWithoutType = {
        type: 'gitlab',
      };
      return request(app.getHttpServer())
        .post('/source')
        .send(sourceWithoutType)
        .expect(400)
        .expect((res) => {
          expect(res.body).toMatchSnapshot();
        });
    });
  });
});