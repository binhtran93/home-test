import { FixtureRepository } from '../fixture.repository';
import { Injectable } from '@nestjs/common';
import { FixtureDto } from '../dtos/fixture.dto';
import { MapperProcessorService } from '../../shared/mapper/mapper-processor.service';
import { FixtureEntity } from '../fixture.entity';
import { PaginationQuery } from '../dtos/pagination-query.dto';
import { TournamentRepository } from '../../tournament/tournament.repository';

@Injectable()
export class FixtureListService {
  constructor(
    private readonly fixtureRepository: FixtureRepository,
    private readonly tournamentRepository: TournamentRepository,
    private readonly mapperProcessorService: MapperProcessorService,
  ) {}

  /**
   * Paginate the fixtures
   * @param paginationQuery
   */
  async paginate(paginationQuery: PaginationQuery): Promise<FixtureDto[]> {
    const { page, limit, tournamentId, startDate, endDate } = paginationQuery;
    const fixtures = await this.fixtureRepository.paginate(
      page ?? 1,
      limit ?? 20,
      tournamentId,
      startDate,
      endDate,
    );

    return fixtures.map((fixture) =>
      this.mapperProcessorService.map<FixtureEntity, FixtureDto>(fixture),
    );
  }
}
