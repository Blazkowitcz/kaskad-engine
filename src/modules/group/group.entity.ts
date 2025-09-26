import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('groups')
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  icon: string;

  @Column({ type: Boolean })
  isModerator: boolean;

  @Column({ type: Boolean })
  isAdministrator: boolean;

  @Column({ type: Boolean })
  isTrusted: boolean;

  @Column({ type: Boolean })
  isFreeleech: boolean;
}
