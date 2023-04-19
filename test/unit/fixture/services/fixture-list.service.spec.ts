import { Test, TestingModule } from '@nestjs/testing';
import { readFile } from 'fs/promises';
import { FixtureListService } from '../../../../src/fixture/services/fixture-list.service';
import { FixtureRepository } from '../../../../src/fixture/fixture.repository';
import { MapperProcessorService } from '../../../../src/shared/mapper/mapper-processor.service';
import { FixtureDto } from '../../../../src/fixture/dtos/fixture.dto';

describe('FixtureListService', () => {
  let fixtureListService: FixtureListService;
  let fixtureData;
  const fixtureDto: FixtureDto = {
    id: 45,
    homeTeam: {
      id: 14,
      name: 'Casper Inc',
      logo: 'https://logo.com/',
    },
    awayTeam: {
      id: 81,
      name: 'Monahan, Pollich and MacGyver',
      logo: 'https://logo.com/',
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
