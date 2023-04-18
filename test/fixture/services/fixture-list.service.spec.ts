import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { readFile } from 'fs/promises';
import { FixtureListService } from '../../../src/fixture/services/fixture-list.service';
import { FixtureRepository } from '../../../src/fixture/fixture.repository';
import { MapperProcessorService } from '../../../src/shared/mapper/mapper.processor.service';
import { FixtureDto } from '../../../src/fixture/dtos/fixture.dto';

const moduleMocker = new ModuleMocker(global);

describe('FixtureListService', () => {
  let fixtureListService: FixtureListService;
  let fixtureData;
  const fixtureDto: FixtureDto = {
    id: 45,
    homeTeam: {
      id: 14,
      name: 'Casper Inc',
    },
    awayTeam: {
      id: 81,
      name: 'Monahan, Pollich and MacGyver',
    },
    tournament: {
      id: 2,
      name: 'CONMEBOL',
    },
    state: 'FT',
    homeTeamScore: 0,
    awayTeamScore: 1,
    date: '2023-04-07T09:08:13.000Z',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [FixtureListService],
    })
      .useMocker(async (token) => {
        if (token === FixtureRepository) {
          const fixturesJson = await readFile(`${__dirname}/../fixtures.json`);
          fixtureData = JSON.parse(fixturesJson.toString());

          return {
            paginate: jest.fn().mockResolvedValue(fixtureData),
          };
        }

        if (token === MapperProcessorService) {
          return {
            map: jest.fn().mockReturnValue(fixtureDto),
          };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);

          return new Mock();
        }
      })
      .compile();

    fixtureListService = app.get<FixtureListService>(FixtureListService);
  });

  describe('root', () => {
    it('should return paginated fixtures DTO', async () => {
      const limit = Math.floor(Math.random() * 30);
      const result = await fixtureListService.paginate(
        new Date(),
        new Date(),
        limit,
      );

      const expected = result.map(() => fixtureDto);

      expect(expected).toEqual(result);
    });
  });
});
