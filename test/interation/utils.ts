import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionFilter } from '../../src/shared/filters/http-exeption.filter';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TournamentEntity } from '../../src/tournament/tournament.entity';

export async function createApp() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [
      AppModule,
      TypeOrmModule.forRootAsync({
        useFactory() {
          return {
            type: 'mysql',
            host: process.env.TEST_DB_HOST,
            port: parseInt(process.env.TEST_DB_PORT as string),
            username: process.env.TEST_DB_USERNAME,
            password: process.env.TEST_DB_PASSWORD,
            database: process.env.TEST_DB_DATABASE,
            entities: [__dirname + '/../../src/**/*.entity{.ts,.js}'],
            synchronize: true,
          };
        },
      }),
    ],
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.useGlobalFilters(new ExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  return app;
}

export async function insertTournaments(dataSource: DataSource) {
  await dataSource.manager
    .query(`insert into tournament (id, name, createdAt, updatedAt)
values  (1, 'UEFA', '2023-04-16 17:20:58.736741', '2023-04-16 17:20:58.736741'),
        (2, 'CONMEBOL', '2023-04-16 17:21:12.820286', '2023-04-16 17:21:12.820286'),
        (3, 'AFC', '2023-04-16 17:21:20.438569', '2023-04-16 17:21:20.438569'),
        (4, 'CAF', '2023-04-16 17:21:29.417517', '2023-04-16 17:21:29.417517');`);
}

export async function insertTeams(dataSource: DataSource) {
  await dataSource.manager.query(
    `insert into team (id, name, logo, createdAt, updatedAt)
values  (1, 'Nitzsche, Balistreri and Ondricka', 'http://dummyimage.com/203x100.png/dddddd/000000', '2023-04-18 16:51:04.876061', '2023-04-18 16:51:04.876061'),
        (2, 'Wiegand, Kling and Goodwin', 'http://dummyimage.com/226x100.png/cc0000/ffffff', '2023-04-18 16:51:04.902195', '2023-04-18 16:51:04.902195'),
        (3, 'Heaney, Orn and Carroll', 'http://dummyimage.com/238x100.png/ff4444/ffffff', '2023-04-18 16:51:04.909285', '2023-04-18 16:51:04.909285'),
        (4, 'Bogan-Wilderman', 'http://dummyimage.com/139x100.png/cc0000/ffffff', '2023-04-18 16:51:04.914632', '2023-04-18 16:51:04.914632'),
        (5, 'Kohler Inc', 'http://dummyimage.com/233x100.png/5fa2dd/ffffff', '2023-04-18 16:51:04.919632', '2023-04-18 16:51:04.919632');`,
  );
}

export async function insertFixtures(dataSource: DataSource) {
  await dataSource.manager.query(
    `
        insert into fixture (id, homeTeamScore, awayTeamScore, state, date, createdAt, updatedAt, tournamentId, homeTeamId, awayTeamId)
        values  (1, 3, 3, 'FT', '2023-04-09 05:51:14', '2023-04-18 16:51:14.101062', '2023-04-18 16:51:14.101062', 2, 1, 2),
                (2, 3, 1, 'FT', '2023-04-12 05:51:14', '2023-04-18 16:51:14.119802', '2023-04-18 16:51:14.119802', 2, 1, 2),
                (3, 0, 1, 'FT', '2023-04-15 05:51:14', '2023-04-18 16:51:14.135631', '2023-04-18 16:51:14.135631', 3, 1, 2),
                (4, 1, 0, 'FT', '2023-04-15 11:51:14', '2023-04-18 16:51:14.149504', '2023-04-18 16:51:14.149504', 1, 1, 2),
                (5, 2, 3, 'FT', '2023-04-15 17:51:14', '2023-04-18 16:51:14.163267', '2023-04-18 16:51:14.163267', 3, 1, 2),
                (6, 3, 2, 'FT', '2023-04-15 23:51:14', '2023-04-18 16:51:14.171966', '2023-04-18 16:51:14.171966', 3, 1, 2),
                (7, 3, 2, 'FT', '2023-04-16 05:51:14', '2023-04-18 16:51:14.180111', '2023-04-18 16:51:14.180111', 1, 1, 2),
                (8, 3, 2, 'FT', '2023-04-16 11:51:14', '2023-04-18 16:51:14.188630', '2023-04-18 16:51:14.188630', 1, 1, 2),
                (9, 3, 3, 'FT', '2023-04-16 17:51:14', '2023-04-18 16:51:14.197457', '2023-04-18 16:51:14.197457', 2, 1, 2),
                (10, 3, 0, 'FT', '2023-04-16 23:51:14', '2023-04-18 16:51:14.205321', '2023-04-18 16:51:14.205321', 4, 1, 2),
                (11, 0, 0, 'FT', '2023-04-17 05:51:14', '2023-04-18 16:51:14.213461', '2023-04-18 16:51:14.213461', 3, 1, 2),
                (12, 3, 1, 'FT', '2023-04-17 11:51:14', '2023-04-18 16:51:14.221042', '2023-04-18 16:51:14.221042', 2, 1, 2),
                (13, 0, 3, 'FT', '2023-04-17 17:51:14', '2023-04-18 16:51:14.230854', '2023-04-18 16:51:14.230854', 4, 1, 2),
                (14, 2, 1, 'FT', '2023-04-17 23:51:14', '2023-04-18 16:51:14.238367', '2023-04-18 16:51:14.238367', 3, 1, 2),
                (15, 1, 2, 'FT', '2023-04-20 23:51:14', '2023-04-18 16:51:14.246209', '2023-04-18 16:51:14.246209', 3, 1, 2),
                (16, null, null, 'scheduled', '2023-04-21 05:51:14', '2023-04-18 16:51:14.254645', '2023-04-18 16:51:14.254645', 2, 1, 2),
                (17, null, null, 'scheduled', '2023-04-21 11:51:14', '2023-04-18 16:51:14.262651', '2023-04-18 16:51:14.262651', 1, 1, 2),
                (18, null, null, 'scheduled', '2023-04-24 11:51:14', '2023-04-18 16:51:14.270828', '2023-04-18 16:51:14.270828', 3, 1, 2),
                (19, null, null, 'scheduled', '2023-04-24 17:51:14', '2023-04-18 16:51:14.279888', '2023-04-18 16:51:14.279888', 1, 1, 2),
                (20, null, null, 'scheduled', '2023-04-24 23:51:14', '2023-04-18 16:51:14.287833', '2023-04-18 16:51:14.287833', 2, 1, 2);`,
  );
}
