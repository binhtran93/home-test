import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { MapperProcessorService } from '../../../src/shared/mapper/mapper-processor.service';
import { FixtureMapperService } from '../../../src/shared/mapper/fixture-mapper.service';
import { FixtureEntity } from '../../../src/fixture/fixture.entity';
import { TeamDto } from '../../../src/team/dtos/team.dto';
import { TournamentDto } from '../../../src/tournament/dtos/tournament.dto';
import { FixtureDto } from '../../../src/fixture/dtos/fixture.dto';

const moduleMocker = new ModuleMocker(global);

describe('FixtureMapperService', () => {
  let fixtureMapperService: FixtureMapperService;
  const fixtureEntity: FixtureEntity = {
    id: 45,
    homeTeam: {
      id: 14,
      name: 'Casper Inc',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    awayTeam: {
      id: 81,
      name: 'Monahan, Pollich and MacGyver',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    tournament: {
      id: 2,
      name: 'CONMEBOL',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    state: 'FT',
    homeTeamScore: 0,
    awayTeamScore: 1,
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('root', () => {
    it('should return paginated fixtures DTO', async () => {
      const homeTeamDto: TeamDto = {
        id: 1,
        name: 'home_team',
      };

      const awayTeamDto: TeamDto = {
        id: 2,
        name: 'away_team',
      };

      const tournamentDto: TournamentDto = {
        id: 1,
        name: 'tournament',
      };

      const app: TestingModule = await Test.createTestingModule({
        providers: [FixtureMapperService],
      })
        .useMocker(async (token) => {
          if (token === MapperProcessorService) {
            return {
              map: jest
                .fn()
                .mockReturnValueOnce(homeTeamDto)
                .mockReturnValueOnce(awayTeamDto)
                .mockReturnValueOnce(tournamentDto),
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

      fixtureMapperService =
        app.get<FixtureMapperService>(FixtureMapperService);

      const result = await fixtureMapperService.map(fixtureEntity);
      const expected: FixtureDto = {
        id: fixtureEntity.id,
        homeTeam: homeTeamDto,
        awayTeam: awayTeamDto,
        awayTeamScore: fixtureEntity.awayTeamScore,
        homeTeamScore: fixtureEntity.homeTeamScore,
        state: fixtureEntity.state,
        tournament: tournamentDto,
        date: fixtureEntity.date.toISOString(),
      };
      expect(result).toEqual(expected);
    });
  });
});
