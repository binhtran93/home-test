import { Test, TestingModule } from '@nestjs/testing';
import { TeamMapperService } from '../../../../src/shared/mapper/team-mapper.service';
import { TeamEntity } from '../../../../src/team/team.entity';
import { FixtureMapperService } from '../../../../src/shared/mapper/fixture-mapper.service';
import { MapperProcessorService } from '../../../../src/shared/mapper/mapper-processor.service';
import { FixtureEntity } from '../../../../src/fixture/fixture.entity';

describe('TeamMapperService', () => {
  let teamMapperService: TeamMapperService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [TeamMapperService],
    }).compile();

    teamMapperService = app.get<TeamMapperService>(TeamMapperService);
  });

  describe('map', () => {
    it('should convert to DTO', async () => {
      const entity: TeamEntity = {
        id: 1,
        name: 'name',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await teamMapperService.map(entity);

      expect({
        id: 1,
        name: 'name',
      }).toEqual(result);
    });
  });

  describe('supports', () => {
    it('should be able to support Team entity', async () => {
      const entity = new TeamEntity();

      expect(teamMapperService.supports(entity)).toBeTruthy();
    });

    it('should not be able to support entities that is not Team', async () => {
      const entity = new FixtureEntity();

      expect(teamMapperService.supports(entity)).toBeFalsy();
    });
  });
});
