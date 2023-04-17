import { Module } from '@nestjs/common';
import { FixtureController } from './fixture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FixtureEntity } from './fixture.entity';
import { FixtureRepository } from './fixture.repository';
import { TeamModule } from '../team/team.module';
import { TournamentModule } from '../tournament/tournament.module';
import { FixtureListService } from './services/fixture-list.service';
import { DatesHaveMatchesService } from './services/dates-have-matches.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FixtureEntity]),
    TeamModule,
    TournamentModule,
  ],
  controllers: [FixtureController],
  providers: [FixtureRepository, FixtureListService, DatesHaveMatchesService],
  exports: [FixtureRepository],
})
export class FixtureModule {}
