import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'team' })
export class Team {
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
