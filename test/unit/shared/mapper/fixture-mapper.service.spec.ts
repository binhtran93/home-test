import { Test, TestingModule } from '@nestjs/testing';
import { MapperProcessorService } from '../../../../src/shared/mapper/mapper-processor.service';
import { FixtureMapperService } from '../../../../src/shared/mapper/fixture-mapper.service';
import { FixtureEntity } from '../../../../src/fixture/fixture.entity';
import { TeamDto } from '../../../../src/team/dtos/team.dto';
import { TournamentDto } from '../../../../src/tournament/dtos/tournament.dto';
import { FixtureDto } from '../../../../src/fixture/dtos/fixture.dto';
import { TeamEntity } from '../../../../src/team/team.entity';

describe('FixtureMapperService', () => {
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

  describe('map', () => {
    it('should convert Fixture entity to DTO', async () => {
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
        })
        .compile();

      const fixtureMapperService =
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

  describe('supports', () => {
    it('should be able to support fixture entity', async () => {
      const app: TestingModule = await Test.createTestingModule({
        providers: [FixtureMapperService],
      })
        .useMocker(async (token) => {
          if (token === MapperProcessorService) {
            return {
              map: jest.fn(),
            };
          }
        })
        .compile();

      const fixtureMapperService =
        app.get<FixtureMapperService>(FixtureMapperService);

      const fixtureEntity: FixtureEntity = new FixtureEntity();

      expect(fixtureMapperService.supports(fixtureEntity)).toBeTruthy();
    });

    it('should not be able to support entities that is not fixture', async () => {
      const app: TestingModule = await Test.createTestingModule({
        providers: [FixtureMapperService],
      })
        .useMocker(async (token) => {
          if (token === MapperProcessorService) {
            return {
              map: jest.fn(),
            };
          }
        })
        .compile();

      const fixtureMapperService =
        app.get<FixtureMapperService>(FixtureMapperService);

      const entity = new TeamEntity();

      expect(fixtureMapperService.supports(entity)).toBeFalsy();
    });
  });
});
