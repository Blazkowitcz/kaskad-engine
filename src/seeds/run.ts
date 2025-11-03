import { AppDataSource } from '../../data-source';
import { runSeeds } from './index';

const main = async () => {
  await AppDataSource.initialize();
  await runSeeds(AppDataSource);
  await AppDataSource.destroy();
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
