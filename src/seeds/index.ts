import { DataSource } from 'typeorm';
import { seedCategories } from './category.seed';
import { seedSubcategories } from './subcategories.seed';
import { seedLanguages } from './language.seed';
import { seedGroups } from './group.seed';

export const runSeeds = async (dataSource: DataSource) => {
  await seedCategories(dataSource);
  await seedSubcategories(dataSource);
  await seedLanguages(dataSource);
  await seedGroups(dataSource);
};
