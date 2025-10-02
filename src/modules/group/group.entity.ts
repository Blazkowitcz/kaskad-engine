import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  code: string;

  @Column({ type: String })
  icon: string;

  @Column({ type: Boolean, default: false })
  isModerator: boolean;

  @Column({ type: Boolean, default: false })
  isAdministrator: boolean;

  @Column({ type: Boolean, default: false })
  isTrusted: boolean;

  @Column({ type: Boolean, default: false })
  isFreeleech: boolean;

  @Column({ type: Boolean, default: false })
  canDownload: boolean;

  @Column({ type: Boolean, default: false })
  canUpload: boolean;

  @Column({ type: Boolean, default: false })
  canAddToGroup: boolean;

  @Column({ type: Number, default: 3 })
  priority: number;
}
