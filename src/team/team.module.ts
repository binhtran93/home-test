import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './team.entity';
import { TeamRepository } from './team.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity])],
  controllers: [],
  providers: [TeamRepository],
  exports: [TeamRepository],
})
export class TeamModule {}
