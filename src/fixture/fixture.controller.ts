import { Controller, Get, Query } from '@nestjs/common';
import { PaginationQuery } from './dtos/pagination-query.dto';
import { FixtureListService } from './services/fixture-list.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AvailableFixturesDateQueryDto } from './dtos/available-fixtures-date-query.dto';
import { DatesHaveMatchesService } from './services/dates-have-matches.service';
import { FixtureDto } from './dtos/fixture.dto';
import { AvailableFixturesDateResponseDto } from './dtos/available-fixtures-date-response.dto';

@ApiTags('fixtures')
@Controller('/api/v1/fixtures')
export class FixtureController {
  constructor(
    private readonly fixtureListService: FixtureListService,
    private readonly datesHaveMatchesService: DatesHaveMatchesService,
  ) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    type: [FixtureDto],
  })
  async paginate(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<FixtureDto[]> {
    return this.fixtureListService.paginate(
      paginationQuery.startDate,
      paginationQuery.endDate,
      paginationQuery.limit,
    );
  }

  @Get('/dates')
  @ApiResponse({
    status: 200,
    type: [AvailableFixturesDateResponseDto],
  })
  async getDatesHaveMatches(
    @Query() datesHaveMatchesQueryDto: AvailableFixturesDateQueryDto,
  ): Promise<AvailableFixturesDateResponseDto[]> {
    return this.datesHaveMatchesService.get(
      datesHaveMatchesQueryDto.startDate,
      datesHaveMatchesQueryDto.endDate,
    );
  }
}
