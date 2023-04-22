import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  createApp,
  insertFixtures,
  insertTeams,
  insertTournaments,
} from './utils';
import { DataSource } from 'typeorm';

import * as chai from 'chai';
import * as chaiJsonSchema from 'chai-json-schema';
import fixtureSchema from './schema/fixture.schema';

chai.use(chaiJsonSchema);
const chaiExpect = chai.expect;

describe('FixtureController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
    await app.init();
  });

  beforeEach(async () => {
    const dataSource = app.get(DataSource);
    const entities = dataSource.entityMetadatas;

    await dataSource.manager.query('SET foreign_key_checks = 0');
    for (const entity of entities) {
      const repository = dataSource.getRepository(entity.name); // Get repository
      await repository.clear(); // Clear each entity table's content
    }
  });

  afterAll(async () => {
    const dataSource = app.get(DataSource);
    await dataSource.destroy();
    await app.close();
  });

  describe('/api/v1/fixtures (GET)', () => {
    it('can return paged fixtures', async () => {
      await insertTournaments(app.get(DataSource));
      await insertTeams(app.get(DataSource));
      await insertFixtures(app.get(DataSource));
      return request(app.getHttpServer())
        .get('/api/v1/fixtures')
        .query({
          startDate: '2023-04-09 05:51:14',
          endDate: '2023-04-24 23:51:14',
          limit: 10,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toEqual(10);
          res.body.forEach((fixture) => {
            chaiExpect(fixture).to.be.jsonSchema(fixtureSchema);
          });
        });
    });

    it('can return paged fixtures when filter with tournament', async () => {
      await insertTournaments(app.get(DataSource));
      await insertTeams(app.get(DataSource));
      await insertFixtures(app.get(DataSource));
      return request(app.getHttpServer())
        .get('/api/v1/fixtures')
        .query({
          startDate: '2023-04-09 05:51:14',
          endDate: '2023-04-24 23:51:14',
          tournamentId: 1,
          limit: 10,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.length).toEqual(5);
          res.body.forEach((fixture) => {
            chaiExpect(fixture).to.be.jsonSchema(fixtureSchema);
          });
        });
    });
  });

  describe('/api/v1/fixtures/dates (GET)', () => {
    it('missing startDate', async () => {
      request(app.getHttpServer())
        .get('/api/v1/fixtures/dates')
        .query({
          endDate: new Date().toISOString(),
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.data[0]).toEqual('startDate should not be empty');
        });
    });

    it('missing endDate', () => {
      return request(app.getHttpServer())
        .get('/api/v1/fixtures/dates')
        .query({
          startDate: new Date().toISOString(),
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.data[0]).toEqual('endDate should not be empty');
        });
    });

    it('can return list of available dates have fixtures', async () => {
      await insertTournaments(app.get(DataSource));
      await insertTeams(app.get(DataSource));
      await insertFixtures(app.get(DataSource));
      return request(app.getHttpServer())
        .get('/api/v1/fixtures/dates')
        .query({
          startDate: '2023-04-09 05:51:14',
          endDate: '2023-04-15 23:51:14',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual([
            {
              date: '2023-04-09',
            },
            {
              date: '2023-04-12',
            },
            {
              date: '2023-04-15',
            },
          ]);
        });
    });

    it('can return list of available dates have fixtures when filter with tournament', async () => {
      await insertTournaments(app.get(DataSource));
      await insertTeams(app.get(DataSource));
      await insertFixtures(app.get(DataSource));
      return request(app.getHttpServer())
        .get('/api/v1/fixtures/dates')
        .query({
          startDate: '2023-04-09 05:51:14',
          endDate: '2023-04-15 23:51:14',
          tournamentId: 3,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual([
            {
              date: '2023-04-15',
            },
          ]);
        });
    });
  });
});
