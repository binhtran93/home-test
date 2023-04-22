import { FixtureRepository } from '../fixture.repository';
import { Injectable } from '@nestjs/common';
import { FixtureDto } from '../dtos/fixture.dto';
import { MapperProcessorService } from '../../shared/mapper/mapper-processor.service';
import { FixtureEntity } from '../fixture.entity';

@Injectable()
export class FixtureListService {
  constructor(
    private readonly fixtureRepository: FixtureRepository,
    private readonly mapperProcessorService: MapperProcessorService,
  ) {}

  /**
   * Paginate the fixtures
   * @param startDate
   * @param endDate
   * @param limit
   */
  async paginate(
    limit: number,
    startDate?: Date,
    endDate?: Date,
  ): Promise<FixtureDto[]> {
    const fixtures = await this.fixtureRepository.paginate(
      limit,
      startDate,
      endDate,
    );

    return fixtures.map((fixture) =>
      this.mapperProcessorService.map<FixtureEntity, FixtureDto>(fixture),
    );
  }
}
