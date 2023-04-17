import { FixtureRepository } from '../fixture.repository';
import { TeamRepository } from '../../team/team.repository';
import { TournamentRepository } from '../../tournament/tournament.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FixtureListService {
  constructor(
    private readonly fixtureRepository: FixtureRepository,
    private readonly teamRepository: TeamRepository,
    private readonly tournamentRepository: TournamentRepository,
  ) {}

  async paginate(startDate: Date, endDate: Date, limit: number) {
    return this.fixtureRepository.paginate(startDate, endDate, limit);
  }
}
