import { Controller, Get, Query } from '@nestjs/common';
import { PaginationQuery } from './dtos/pagination-query.dto';
import { FixtureListService } from './services/fixture-list.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AvailableFixturesDateQueryDto } from './dtos/available-fixtures-date-query.dto';
import { AvailableFixturesDatesService } from './services/available-fixtures-dates.service';
import { FixtureDto } from './dtos/fixture.dto';
import { AvailableFixturesDateResponseDto } from './dtos/available-fixtures-date-response.dto';

@ApiTags('fixtures')
@Controller('/api/v1/fixtures')
export class FixtureController {
  constructor(
    private readonly fixtureListService: FixtureListService,
    private readonly datesHaveMatchesService: AvailableFixturesDatesService,
  ) {}

  /**
   * API to list fixtures with pagination
   * @param paginationQuery
   */
  @Get('/')
  @ApiResponse({
    status: 200,
    type: [FixtureDto],
  })
  async paginate(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<FixtureDto[]> {
    return this.fixtureListService.paginate(
      paginationQuery.limit ?? 20,
      paginationQuery.startDate,
      paginationQuery.endDate,
    );
  }

  /**
   * API to get dates that have fixtures
   * @param datesHaveMatchesQueryDto
   */
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
