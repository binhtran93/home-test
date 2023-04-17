import { Module } from '@nestjs/common';
import { FixtureMapperService } from './fixture.mapper.service';
import { MapperProcessorService } from './mapper.processor.service';
import { MAPPER_SERVICES } from './const';

@Module({
  imports: [],
  controllers: [],
  providers: [
    MapperProcessorService,
    FixtureMapperService,
    {
      provide: MAPPER_SERVICES,
      inject: [FixtureMapperService],
      useFactory: (...services) => {
        return services;
      },
    },
  ],
  exports: [MapperProcessorService],
})
export class MapperModule {}
