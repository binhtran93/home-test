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

  async paginate(startDate: Date, endDate: Date) {
    const qb = await this.createQueryBuilder('fixture')
      .leftJoinAndSelect('fixture.homeTeam', 'homeTeam')
      .leftJoinAndSelect('fixture.awayTeam', 'awayTeam')
      .leftJoinAndSelect('fixture.tournament', 'tournament')
      .orderBy({
        'fixture.date': 'ASC',
      })
      .limit(20);

    return qb.getMany();
  }
}
