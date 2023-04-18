import { Test, TestingModule } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { readFile } from 'fs/promises';
import { FixtureListService } from '../../../src/fixture/services/fixture-list.service';
import { FixtureRepository } from '../../../src/fixture/fixture.repository';
import { MapperProcessorService } from '../../../src/shared/mapper/mapper.processor.service';
import { FixtureDto } from '../../../src/fixture/dtos/fixture.dto';
import { AvailableFixturesDatesService } from '../../../src/fixture/services/available-fixtures-dates.service';

const moduleMocker = new ModuleMocker(global);

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

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);

          return new Mock();
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
