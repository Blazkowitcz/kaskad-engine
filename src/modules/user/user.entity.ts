import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, unique: true })
  username: string;

  @Column({ type: String, select: false })
  password: string;

  @Column({ type: String, unique: true, select: false })
  email: string;

  @Column({ type: String, select: false })
  passkey: string;
}

export interface UserRequest extends Request {
  user: { id: string; passkey: string; username: string };
}
