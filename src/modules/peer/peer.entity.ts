import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('peers')
export class Peer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  hash: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @Column({ type: String })
  ip: string;

  @Column({ type: Number })
  port: number;

  @Column({ type: Date })
  date: Date;
}
