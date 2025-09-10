import { AppDataSource } from '../../data-source'; // Ton fichier de config TypeORM
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
