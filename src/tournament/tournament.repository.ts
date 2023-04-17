import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { TournamentEntity } from './tournament.entity';

@Injectable()
export class TournamentRepository extends Repository<TournamentEntity> {
  constructor(
    @InjectRepository(TournamentEntity)
    repository: Repository<TournamentEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
