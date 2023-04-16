import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Team } from '../team/team.entity';

export type FixtureState = 'scheduled' | 'live' | 'FT';

@Entity({ name: 'fixture' })
export class Fixture {
  @PrimaryColumn({ unsigned: true, type: 'bigint' })
  id: number;

  @Column({ type: 'bigint', unsigned: true })
  homeTeamId: number;

  @ManyToOne(() => Team, { nullable: false })
  @JoinColumn({ name: 'homeTeamId' })
  homeTeam: Team;

  @Column({ type: 'bigint', unsigned: true })
  awayTeamId: number;

  @ManyToOne(() => Team, { nullable: false })
  @JoinColumn({ name: 'awayTeamId' })
  awayTeam: Team;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  homeTeamScore: number;

  @Column({ type: 'bigint', unsigned: true, nullable: true })
  awayTeamScore: number;

  @Column({ length: 50 })
  state: FixtureState;

  @Column({ type: 'timestamp' })
  @Index()
  date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Index()
  updatedAt: Date;
}
