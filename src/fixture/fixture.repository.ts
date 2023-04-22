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

  /**
   * Paginate fixtures
   * @param page
   * @param tournamentId
   * @param startDate
   * @param endDate
   * @param limit
   */
  async paginate(
    page: number,
    limit: number,
    tournamentId?: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    const qb = await this.createQueryBuilder('fixture')
      .leftJoinAndSelect('fixture.homeTeam', 'homeTeam')
      .leftJoinAndSelect('fixture.awayTeam', 'awayTeam')
      .leftJoinAndSelect('fixture.tournament', 'tournament')
      .where('1 = 1')
      .orderBy({
        'fixture.date': 'ASC',
      })
      .offset((page - 1) * limit)
      .limit(limit);

    if (tournamentId != null) {
      qb.andWhere('fixture.tournamentId = :tournamentId').setParameter(
        'tournamentId',
        tournamentId,
      );
    }

    if (startDate != null) {
      qb.andWhere('fixture.date >= :startDate').setParameter(
        'startDate',
        startDate,
      );
    }

    if (endDate != null) {
      qb.andWhere('fixture.date <= :endDate').setParameter('endDate', endDate);
    }

    return qb.getMany();
  }

  /**
   * Find all dates that have fixtures within date window
   * @param startDate
   * @param endDate
   */
  async findDatesHaveFixtures(
    startDate: Date,
    endDate: Date,
  ): Promise<string[]> {
    const qb = await this.createQueryBuilder('f')
      .select(
        "YEAR(date) as y, DATE_FORMAT(date, '%m') as m, DATE_FORMAT(date, '%d') as d",
      )
      .where('f.date >= :startDate')
      .andWhere('f.date <= :endDate')
      .orderBy({
        'f.date': 'ASC',
      })
      .groupBy(
        "YEAR(f.date), DATE_FORMAT(f.date, '%m'), DATE_FORMAT(f.date, '%d')",
      )
      .orderBy(
        "YEAR(f.date), DATE_FORMAT(f.date, '%m'), DATE_FORMAT(f.date, '%d')",
      )
      .setParameters({
        startDate: startDate,
        endDate: endDate,
      });

    const rawData = await qb.getRawMany();

    return rawData.map((raw) => `${raw.y}-${raw.m}-${raw.d}`);
  }
}
