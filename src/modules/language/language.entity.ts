import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Torrent } from '../torrent/torrent.entity';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  slug: string;

  @ManyToMany(
    () => Torrent,
    (torrent: Torrent): Language[] => torrent.languages,
  )
  torrents: Torrent[];
}
