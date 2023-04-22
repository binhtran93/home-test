import { Test, TestingModule } from '@nestjs/testing';
import { FixtureController } from '../../../src/fixture/fixture.controller';
import { FixtureListService } from '../../../src/fixture/services/fixture-list.service';
import { PaginationQuery } from '../../../src/fixture/dtos/pagination-query.dto';
import { readFile } from 'fs/promises';

describe('FixtureController', () => {
  let fixtureController: FixtureController;
  let fixtureData;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FixtureController],
      providers: [],
    })
      .useMocker(async (token) => {
        if (token === FixtureListService) {
          const fixturesJson = await readFile(`${__dirname}/fixtures.json`);
          fixtureData = JSON.parse(fixturesJson.toString());

          return {
            paginate: jest.fn().mockResolvedValue(fixtureData),
          };
        }
      })
      .compile();

    fixtureController = app.get<FixtureController>(FixtureController);
  });

  describe('root', () => {
    it('should return paginated fixtures', async () => {
      const paginateQuery: PaginationQuery = {
        startDate: new Date(),
        endDate: new Date(),
        limit: Math.floor(Math.random() * 30),
      };
      const result = await fixtureController.paginate(paginateQuery);
      expect(fixtureData).toEqual(result);
    });
  });
});
