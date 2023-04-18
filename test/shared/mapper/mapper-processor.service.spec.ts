import { MapperProcessorService } from '../../../src/shared/mapper/mapper-processor.service';
import { MAPPER_SERVICES } from '../../../src/shared/mapper/const';
import { TestBed } from '@automock/jest';

describe('MapperProcessorService', () => {
  let mapperProcessorService: MapperProcessorService;
  let fixtureMapperService;
  let teamMapperService;
  let tournamentMapperService;

  beforeEach(async () => {
    fixtureMapperService = { supports: jest.fn(), map: jest.fn() };
    teamMapperService = { supports: jest.fn(), map: jest.fn() };
    tournamentMapperService = { supports: jest.fn(), map: jest.fn() };

    const { unit } = TestBed.create(MapperProcessorService)
      .mock(MAPPER_SERVICES)
      .using([fixtureMapperService, teamMapperService, tournamentMapperService])
      .compile();

    mapperProcessorService = unit;
  });

  describe('map', () => {
    it('should able to find valid map service for fixture entity', async () => {
      fixtureMapperService.supports.mockReturnValue(true);

      const func = () => mapperProcessorService.map({});
      expect(func).not.toThrow(Error);
      expect(fixtureMapperService.map).toHaveBeenCalledTimes(1);
      expect(teamMapperService.map).toHaveBeenCalledTimes(0);
      expect(tournamentMapperService.map).toHaveBeenCalledTimes(0);
    });

    it('should able to find valid map service for team entity', async () => {
      teamMapperService.supports.mockReturnValue(true);

      const func = () => mapperProcessorService.map({});
      expect(func).not.toThrow(Error);
      expect(teamMapperService.map).toHaveBeenCalledTimes(1);
      expect(fixtureMapperService.map).toHaveBeenCalledTimes(0);
      expect(tournamentMapperService.map).toHaveBeenCalledTimes(0);
    });

    it('should able to find valid map service for tournament entity', async () => {
      tournamentMapperService.supports.mockReturnValue(true);

      const func = () => mapperProcessorService.map({});
      expect(func).not.toThrow(Error);
      expect(tournamentMapperService.map).toHaveBeenCalledTimes(1);
      expect(teamMapperService.map).toHaveBeenCalledTimes(0);
      expect(fixtureMapperService.map).toHaveBeenCalledTimes(0);
    });
  });
});
