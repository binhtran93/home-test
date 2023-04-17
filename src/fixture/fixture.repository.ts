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

  async paginate(startDate: Date, endDate: Date, limit: number) {
    const qb = await this.createQueryBuilder('fixture')
      .leftJoinAndSelect('fixture.homeTeam', 'homeTeam')
      .leftJoinAndSelect('fixture.awayTeam', 'awayTeam')
      .leftJoinAndSelect('fixture.tournament', 'tournament')
      .where('fixture.date >= :startDate')
      .andWhere('fixture.date <= :endDate')
      .orderBy({
        'fixture.date': 'ASC',
      })
      .setParameters({
        startDate: startDate,
        endDate: endDate,
      })
      .limit(limit);

    return qb.getMany();
  }
}
