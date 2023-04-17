import { FixtureRepository } from '../fixture.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FixtureListService {
  constructor(private readonly fixtureRepository: FixtureRepository) {}

  async paginate(startDate: Date, endDate: Date, limit: number) {
    return this.fixtureRepository.paginate(startDate, endDate, limit);
  }
}
