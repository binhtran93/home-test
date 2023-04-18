import { Test, TestingModule } from '@nestjs/testing';
import { TournamentMapperService } from '../../../src/shared/mapper/tournament-mapper.service';
import { TournamentEntity } from '../../../src/tournament/tournament.entity';

describe('TournamentMapperService', () => {
  let tournamentMapperService: TournamentMapperService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [TournamentMapperService],
    }).compile();

    tournamentMapperService = app.get<TournamentMapperService>(
      TournamentMapperService,
    );
  });

  describe('root', () => {
    it('should convert to DTO', async () => {
      const entity: TournamentEntity = {
        id: 1,
        name: 'name',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = await tournamentMapperService.map(entity);

      expect({
        id: 1,
        name: 'name',
      }).toEqual(result);
    });
  });
});
