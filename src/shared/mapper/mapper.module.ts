import { Module } from '@nestjs/common';
import { FixtureMapperService } from './fixture.mapper.service';
import { MapperProcessorService } from './mapper.processor.service';
import { MAPPER_SERVICES } from './const';
import { TeamMapperService } from './team.mapper.service';
import { TournamentMapperService } from './tournament.mapper.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    MapperProcessorService,
    FixtureMapperService,
    TeamMapperService,
    TournamentMapperService,
    {
      provide: MAPPER_SERVICES,
      inject: [
        FixtureMapperService,
        TeamMapperService,
        TournamentMapperService,
      ],
      useFactory: (...services) => {
        return services;
      },
    },
  ],
  exports: [MapperProcessorService],
})
export class MapperModule {}
