import { DataSource } from 'typeorm';
import { Category } from '../modules/category/category.entity';

export const seedCategories = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Category);
  const categories = [
    { name: 'Application', slug: 'application', icon: 'application' },
    { name: 'System', slug: 'system', icon: 'system' },
  ];
  for (const category of categories) {
    const exist = await repo.findOne({ where: { name: category.name } });
    if (!exist) {
      await repo.save(category);
    }
  }
};
