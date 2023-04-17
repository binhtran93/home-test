import { Controller, Get, Query } from '@nestjs/common';
import { PaginationQuery } from './request/pagination-query.dto';
import { FixtureListService } from './services/fixture-list.service';
import { ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { DatesHaveMatchesQueryDto } from './request/dates-have-matches-query.dto';
import { DatesHaveMatchesService } from './services/dates-have-matches.service';
import { FixtureDto } from './response/fixture.dto';
import { ApiResponseModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Controller('/api/v1/fixtures')
@ApiTags('fixtures')
export class FixtureController {
  constructor(
    private readonly fixtureListService: FixtureListService,
    private readonly datesHaveMatchesService: DatesHaveMatchesService,
  ) {}

  @Get('/')
  async paginate(
    @Query() paginationQuery: PaginationQuery,
  ): Promise<FixtureDto> {
    const a = this.fixtureListService.paginate(
      paginationQuery.startDate,
      paginationQuery.endDate,
      paginationQuery.limit,
    );

    return new FixtureDto();
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
