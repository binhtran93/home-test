import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TeamEntity } from '../team/team.entity';
import { TournamentEntity } from '../tournament/tournament.entity';

export type FixtureState = 'scheduled' | 'live' | 'FT';

@Entity({ name: 'fixture' })
export class FixtureEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @ManyToOne(() => TournamentEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'tournamentId' })
  tournament: TournamentEntity;

  @ManyToOne(() => TeamEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'homeTeamId' })
  homeTeam: TeamEntity;

  @ManyToOne(() => TeamEntity, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'awayTeamId' })
  awayTeam: TeamEntity;

  @Column({ type: 'int', unsigned: true, nullable: true })
  homeTeamScore: number;

  @Column({ type: 'int', unsigned: true, nullable: true })
  awayTeamScore: number;

  @Column({ length: 50 })
  state: FixtureState;

  @Column({ type: 'timestamp' })
  @Index()
  date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  @Index()
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Index()
  updatedAt?: Date;
}
