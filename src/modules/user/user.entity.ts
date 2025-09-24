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

  @Column({ type: Number, default: 0 })
  downloaded: number;

  @Column({ type: Number, default: 10240 })
  uploaded: number;

  /**
   * Return user ratio
   */
  getRatio(): number {
    return this.uploaded / this.downloaded;
  }
}

export interface UserRequest extends Request {
  user: { id: string; passkey: string; username: string };
}

export interface UserFields {
  password?: boolean;
  passkey?: boolean;
  email?: boolean;
}
