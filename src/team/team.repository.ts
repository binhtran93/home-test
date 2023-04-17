import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TeamEntity } from './team.entity';

@Injectable()
export class TeamRepository extends Repository<TeamEntity> {
  constructor(
    @InjectRepository(TeamEntity) repository: Repository<TeamEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
