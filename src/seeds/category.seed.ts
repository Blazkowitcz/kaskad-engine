import { DataSource } from 'typeorm';
import { Category } from '../modules/category/category.entity';

export const seedCategories = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Category);
  const categories = [
    { name: 'Videos', slug: 'videos', icon: 'camera' },
    { name: 'Audios', slug: 'audios', icon: 'note' },
    { name: 'Applications', slug: 'applications', icon: 'app' },
    { name: 'Ebooks', slug: 'ebooks', icon: 'book' },
    { name: 'Jeux-Vidéos', slug: 'jeux-videos', icon: 'controller' },
    { name: 'System', slug: 'system', icon: 'system' },
  ];
  for (const category of categories) {
    const exist = await repo.findOne({ where: { name: category.name } });
    if (!exist) {
      await repo.save(category);
    }
  }
};
