import { MapperProcessorService } from '../../../src/shared/mapper/mapper-processor.service';
import { MAPPER_SERVICES } from '../../../src/shared/mapper/const';
import { FixtureEntity } from '../../../src/fixture/fixture.entity';
import { TestBed } from '@automock/jest';
import { TeamEntity } from '../../../src/team/team.entity';
import { TournamentEntity } from '../../../src/tournament/tournament.entity';

describe('MapperProcessorService', () => {
  let mapperProcessorService: MapperProcessorService;
  const fixtureMapperService = { supports: jest.fn(), map: jest.fn() };
  const teamMapperService = { supports: jest.fn(), map: jest.fn() };
  const tournamentMapperService = { supports: jest.fn(), map: jest.fn() };

  beforeAll(async () => {
    const { unit } = TestBed.create(MapperProcessorService)
      .mock(MAPPER_SERVICES)
      .using([fixtureMapperService, teamMapperService, tournamentMapperService])
      .compile();

    mapperProcessorService = unit;
  });

  describe('map', () => {
    it('should able to find valid map service for fixture entity', async () => {
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
      };

      fixtureMapperService.supports.mockReturnValue(true);

      const func = () => {
        mapperProcessorService.map(fixtureEntity);
      };
      expect(func).not.toThrow(Error);
      expect(fixtureMapperService.map).toHaveBeenCalledTimes(1);
      expect(teamMapperService.map).toHaveBeenCalledTimes(0);
      expect(tournamentMapperService.map).toHaveBeenCalledTimes(0);
    });

    it('should able to find valid map service for team entity', async () => {
      const teamEntity: TeamEntity = {
        id: 45,
        name: 'name',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      teamMapperService.supports.mockReturnValue(true);

      const func = () => {
        mapperProcessorService.map(teamEntity);
      };
      expect(func).not.toThrow(Error);
      expect(teamMapperService.map).toHaveBeenCalledTimes(1);
      expect(fixtureMapperService.map).toHaveBeenCalledTimes(0);
      expect(tournamentMapperService.map).toHaveBeenCalledTimes(0);
    });

    it('should able to find valid map service for tournament entity', async () => {
      const tournamentEntity: TournamentEntity = {
        id: 45,
        name: 'name',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      tournamentMapperService.supports.mockReturnValue(true);

      const func = () => {
        mapperProcessorService.map(tournamentEntity);
      };
      expect(func).not.toThrow(Error);
      expect(tournamentMapperService.map).toHaveBeenCalledTimes(1);
      expect(teamMapperService.map).toHaveBeenCalledTimes(0);
      expect(fixtureMapperService.map).toHaveBeenCalledTimes(0);
    });
  });
});
