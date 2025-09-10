import { DataSource } from 'typeorm';
import { seedCategories } from './category.seed';

export const runSeeds = async (dataSource: DataSource) => {
  await seedCategories(dataSource);
  console.log('All seeds executed!');
};
