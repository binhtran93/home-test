import { Test, TestingModule } from '@nestjs/testing';
import { TeamMapperService } from '../../../src/shared/mapper/team-mapper.service';
import { TeamEntity } from '../../../src/team/team.entity';

describe('TeamMapperService', () => {
  let teamMapperService: TeamMapperService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [TeamMapperService],
    }).compile();

    teamMapperService = app.get<TeamMapperService>(TeamMapperService);
  });

  describe('root', () => {
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
});
