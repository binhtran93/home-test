import { Repository } from 'typeorm';
import { FixtureEntity } from './fixture.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FixtureRepository extends Repository<FixtureEntity> {
  constructor(
    @InjectRepository(FixtureEntity) repository: Repository<FixtureEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
