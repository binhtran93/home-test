import { Test, TestingModule } from '@nestjs/testing';
import { FixtureRepository } from '../../../src/fixture/fixture.repository';
import { AvailableFixturesDatesService } from '../../../src/fixture/services/available-fixtures-dates.service';

describe('AvailableFixturesDatesService', () => {
  let availableFixturesDatesService: AvailableFixturesDatesService;
  const datesHaveFixtures = ['2023-5-15', '2023-5-16', '2023-5-19'];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AvailableFixturesDatesService],
    })
      .useMocker(async (token) => {
        if (token === FixtureRepository) {
          return {
            findDatesHaveFixtures: jest
              .fn()
              .mockResolvedValue(datesHaveFixtures),
          };
        }
      })
      .compile();

    availableFixturesDatesService = app.get<AvailableFixturesDatesService>(
      AvailableFixturesDatesService,
    );
  });

  describe('root', () => {
    it('should return available fixtures dates DTO', async () => {
      const result = await availableFixturesDatesService.get(
        new Date(),
        new Date(),
      );

      const expected = datesHaveFixtures.map((date) => {
        return {
          date: date,
        };
      });

      expect(expected).toEqual(result);
    });
  });
});
