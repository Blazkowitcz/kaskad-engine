import { DataSource } from 'typeorm';
import { seedCategories } from './category.seed';
import { seedSubcategories } from './subcategories.seed';

export const runSeeds = async (dataSource: DataSource) => {
  await seedCategories(dataSource);
  await seedSubcategories(dataSource);
};
