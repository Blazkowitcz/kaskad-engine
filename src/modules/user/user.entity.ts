import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, unique: true })
  username: string;

  @Column({ type: String })
  password: string;

  @Column({ type: String, unique: true })
  email: string;

  @Column({ type: String })
  passkey: string;
}
