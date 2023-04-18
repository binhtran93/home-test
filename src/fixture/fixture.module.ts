import { Module } from '@nestjs/common';
import { FixtureController } from './fixture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FixtureEntity } from './fixture.entity';
import { FixtureRepository } from './fixture.repository';
import { TeamModule } from '../team/team.module';
import { TournamentModule } from '../tournament/tournament.module';
import { FixtureListService } from './services/fixture-list.service';
import { AvailableFixturesDatesService } from './services/available-fixtures-dates.service';
import { MapperModule } from '../shared/mapper/mapper.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FixtureEntity]),
    TeamModule,
    TournamentModule,
    MapperModule,
  ],
  controllers: [FixtureController],
  providers: [FixtureRepository, FixtureListService, AvailableFixturesDatesService],
  exports: [FixtureRepository],
})
export class FixtureModule {}
