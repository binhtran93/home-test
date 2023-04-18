import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {
  createApp,
  insertFixtures,
  insertTeams,
  insertTournaments,
} from './utils';
import { DataSource } from 'typeorm';
import { TeamEntity } from '../../src/team/team.entity';
import { TournamentEntity } from '../../src/tournament/tournament.entity';
import { FixtureEntity } from '../../src/fixture/fixture.entity';

describe('FixtureController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createApp();
    await app.init();

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

  it('/api/v1/fixtures (GET) Missing startDate', async () => {
    // const initDb = await readFile(`${__dirname}/init.sql`);
    // await dataSource.manager.query(initDb.toString());
    request(app.getHttpServer())
      .get('/api/v1/fixtures')
      .query({
        endDate: new Date().toISOString(),
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.data[0]).toEqual('startDate should not be empty');
      });
  });

  it('/api/v1/fixtures (GET) Missing endDate', () => {
    return request(app.getHttpServer())
      .get('/api/v1/fixtures')
      .query({
        startDate: new Date().toISOString(),
      })
      .expect(400)
      .expect((res) => {
        expect(res.body.data[0]).toEqual('endDate should not be empty');
      });
  });

  it('/api/v1/fixtures (GET) with paging', async () => {
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
      });
  });
});
