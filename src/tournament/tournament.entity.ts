import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tournament' })
export class TournamentEntity {
  @PrimaryColumn({ unsigned: true, type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  @Index()
  name: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Index()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @Index()
  updatedAt: Date;
}
