import { FixtureRepository } from '../fixture.repository';
import { Injectable } from '@nestjs/common';
import { AvailableFixturesDateResponseDto } from '../dtos/available-fixtures-date-response.dto';
import { AvailableFixturesDateQueryDto } from '../dtos/available-fixtures-date-query.dto';

@Injectable()
export class AvailableFixturesDatesService {
  constructor(private readonly fixtureRepository: FixtureRepository) {}

  /**
   * Get dates that have fixtures
   * @param availableFixturesDateQueryDto
   */
  async get(
    availableFixturesDateQueryDto: AvailableFixturesDateQueryDto,
  ): Promise<AvailableFixturesDateResponseDto[]> {
    const { startDate, endDate, tournamentId } = availableFixturesDateQueryDto;
    const availableDates = await this.fixtureRepository.findDatesHaveFixtures(
      startDate,
      endDate,
      tournamentId,
    );

    return availableDates.map((availableDate) => {
      return {
        date: availableDate,
      };
    });
  }
}
