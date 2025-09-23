import { DataSource } from 'typeorm';
import { Language } from '../modules/language/language.entity';

export const seedLanguages = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(Language);
  const languages = [
    { name: 'English', slug: 'english' },
    { name: 'French', slug: 'french' },
    { name: 'Spanish', slug: 'spanish' },
    { name: 'German', slug: 'german' },
    { name: 'Italian', slug: 'italian' },
    { name: 'Japanese', slug: 'japanese' },
    { name: 'Mandarin', slug: 'mandarin' },
    { name: 'Korean', slug: 'korean' },
    { name: 'Portuguese', slug: 'portuguese' },
    { name: 'Quebecois', slug: 'quebecois' },
  ];
  for (const language of languages) {
    const exist = await repo.findOne({ where: { name: language.name } });
    if (!exist) {
      await repo.save(language);
    }
  }
};
