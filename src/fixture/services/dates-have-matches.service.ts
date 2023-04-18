import { FixtureRepository } from '../fixture.repository';
import { Injectable } from '@nestjs/common';
import { AvailableFixturesDateResponseDto } from '../dtos/available-fixtures-date-response.dto';

@Injectable()
export class DatesHaveMatchesService {
  constructor(private readonly fixtureRepository: FixtureRepository) {}

  async get(
    startDate: Date,
    endDate: Date,
  ): Promise<AvailableFixturesDateResponseDto[]> {
    const availableDates = await this.fixtureRepository.findDatesHaveMatches(
      startDate,
      endDate,
    );

    return availableDates.map((availableDate) => {
      return {
        date: availableDate,
      };
    });
  }
}
