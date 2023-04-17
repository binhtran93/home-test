import { Controller, Get, Query } from '@nestjs/common';
import { PaginationQuery } from './request/pagination-query.dto';
import { FixtureListService } from './services/fixture-list.service';
import { ApiTags } from '@nestjs/swagger';
import { DatesHaveMatchesQueryDto } from './request/dates-have-matches-query.dto';
import { DatesHaveMatchesService } from './services/dates-have-matches.service';

@Controller('/api/v1/fixtures')
@ApiTags('fixtures')
export class FixtureController {
  constructor(
    private readonly fixtureListService: FixtureListService,
    private readonly datesHaveMatchesService: DatesHaveMatchesService,
  ) {}

  @Get('/')
  async paginate(@Query() paginationQuery: PaginationQuery) {
    return this.fixtureListService.paginate(
      paginationQuery.startDate,
      paginationQuery.endDate,
      paginationQuery.limit,
    );
  }

  @Get('/dates')
  async getDatesHaveMatches(
    @Query() datesHaveMatchesQueryDto: DatesHaveMatchesQueryDto,
  ) {
    return this.datesHaveMatchesService.get(
      datesHaveMatchesQueryDto.startDate,
      datesHaveMatchesQueryDto.endDate,
    );
  }
}
