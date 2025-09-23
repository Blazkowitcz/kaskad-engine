import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Language } from '../language/language.entity';
import { Subcategory } from '../subcategory/subcategory.entity';

@Entity('torrents')
export class Torrent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, unique: true })
  name: string;

  @Column({ type: String, unique: true })
  slug: string;

  @Column({ type: String })
  filename: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  @ManyToOne(() => Subcategory, { nullable: false })
  subcategory: Subcategory;

  @Column({ type: 'longtext' })
  description: string;

  @Column({ type: 'longtext' })
  mediainfo: string;

  @Column({ type: String })
  hash: string;

  @Column({ type: Number })
  size: number;

  @Column({ type: Number })
  completed: number;

  @Column({ type: Boolean })
  validated: boolean;

  @Column({ type: Boolean })
  blocked: boolean;

  @Column({ type: Date })
  createdAt: Date;

  @Column({ type: Date })
  updatedAt: Date;

  @ManyToMany(() => Language)
  @JoinTable({
    name: 'torrent_languages',
    joinColumn: { name: 'torrent_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'language_id', referencedColumnName: 'id' },
  })
  languages: Language[];
}

export interface TorrentQuery {
  name?: string;
  categories?: string;
  subcategories?: string;
  author?: string;
  description?: string;
}

export interface TorrentDetails extends Torrent {
  peers?: [];
}
