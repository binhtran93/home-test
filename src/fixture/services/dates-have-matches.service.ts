import { FixtureRepository } from '../fixture.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatesHaveMatchesService {
  constructor(private readonly fixtureRepository: FixtureRepository) {}

  async get(startDate: Date, endDate: Date) {
    return this.fixtureRepository.findDatesHaveMatches(startDate, endDate);
  }
}
