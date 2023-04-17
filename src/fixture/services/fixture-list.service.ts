import { FixtureRepository } from '../fixture.repository';
import { TeamRepository } from '../../team/team.repository';
import { TournamentRepository } from '../../tournament/tournament.repository';

export class FixtureListService {
  constructor(
    private readonly fixtureRepository: FixtureRepository,
    private readonly teamRepository: TeamRepository,
    private readonly tournamentRepository: TournamentRepository,
  ) {}

  async get(startDate: Date, endDate: Date) {
    return this.fixtureRepository.paginate(startDate, endDate);
  }
}
