import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String })
  name: string;

  @Column({ type: String })
  slug: string;

  @Column({ type: String })
  icon: string;
}
