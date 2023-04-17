import { Controller, Get, Query } from '@nestjs/common';
import { FixtureRepository } from './fixture.repository';
import { FixtureEntity } from './fixture.entity';
import { TeamRepository } from '../team/team.repository';
import { TournamentRepository } from '../tournament/tournament.repository';
import { PaginationQuery } from './request/pagination-query.dto';

@Controller('/api/v1/fixtures')
export class FixtureController {
  constructor(
    private readonly fixtureRepository: FixtureRepository,
    private readonly teamRepository: TeamRepository,
    private readonly tournamentRepository: TournamentRepository,
  ) {}

  @Get('/')
  async paginate(@Query() paginationQuery: PaginationQuery) {
    return this.fixtureRepository.paginate(
      paginationQuery.startDate,
      new Date(),
    );
  }

  @Get('/')
  async test() {
    const startDate = new Date();
    startDate.setTime(startDate.getTime() - 10 * 60 * 60 * 24 * 1000);

    const endDate = new Date();
    endDate.setTime(endDate.getTime() + 60 * 60 * 60 * 24 * 1000);

    const now = new Date();

    const teams = await this.teamRepository.findBy([]);
    const tournaments = await this.tournamentRepository.findBy([]);

    while (startDate.getTime() < endDate.getTime()) {
      const homeTeam = teams[Math.floor(Math.random() * teams.length)];
      const awayTeam = teams[Math.floor(Math.random() * teams.length)];
      const tournament =
        tournaments[Math.floor(Math.random() * tournaments.length)];

      const fixture: FixtureEntity = new FixtureEntity();
      fixture.homeTeam = homeTeam;
      fixture.awayTeam = awayTeam;
      fixture.tournament = tournament;
      fixture.date = startDate;

      if (startDate.getTime() < now.getTime()) {
        fixture.homeTeamScore = Math.floor(Math.random() * 4);
        fixture.awayTeamScore = Math.floor(Math.random() * 4);
        fixture.state = 'FT';
      } else {
        fixture.state = 'scheduled';
      }

      const random = Math.floor(Math.random() * 3);
      if (random == 0) {
        startDate.setTime(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
      } else {
        startDate.setTime(startDate.getTime() + 6 * 60 * 60 * 1000);
      }

      await this.fixtureRepository.save(fixture);
    }

    return 1;
  }
}
