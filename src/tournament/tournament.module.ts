import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEntity } from './tournament.entity';
import { TournamentRepository } from './tournament.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentEntity])],
  controllers: [],
  providers: [TournamentRepository],
  exports: [TournamentRepository],
})
export class TournamentModule {}
