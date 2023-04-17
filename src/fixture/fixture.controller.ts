import { Controller, Get, Query } from '@nestjs/common';
import { PaginationQuery } from './request/pagination-query.dto';
import { FixtureListService } from './services/fixture-list.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/fixtures')
@ApiTags('fixtures')
export class FixtureController {
  constructor(private readonly fixtureListService: FixtureListService) {}

  @Get('/')
  async paginate(@Query() paginationQuery: PaginationQuery) {
    return this.fixtureListService.paginate(
      paginationQuery.startDate,
      paginationQuery.endDate,
      paginationQuery.limit,
    );
  }
}
