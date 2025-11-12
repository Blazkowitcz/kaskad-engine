import { DataSource } from 'typeorm';
import { Subcategory } from '../modules/subcategory/subcategory.entity';
import { Category } from '../modules/category/category.entity';

export const seedSubcategories = async (dataSource: DataSource) => {
  const repoSubcategory = dataSource.getRepository(Subcategory);
  const repoCategory = dataSource.getRepository(Category);
  const categories: Category[] = await repoCategory.find();

  const subcategories = [
    {
      name: 'OS Linux',
      slug: 'os-linux',
      icon: 'linux',
      category: 'system',
    },
    {
      name: 'OS Windows',
      slug: 'os-windows',
      icon: 'windows',
      category: 'system',
    },
    {
      name: 'App Linux',
      slug: 'app-linux',
      icon: 'linux',
      category: 'application',
    },
    {
      name: 'App Windows',
      slug: 'app-windows',
      icon: 'windows',
      category: 'application',
    },
    {
      name: 'App OSX',
      slug: 'app-osx',
      icon: 'osx',
      category: 'application',
    },
  ];

  for (const sub of subcategories) {
    const exist = await repoSubcategory.findOne({
      where: { slug: sub.slug },
    });

    if (!exist) {
      const category = categories.find((cat) => cat.slug === sub.category);
      if (!category) {
        continue;
      }

      const newSubcategory = repoSubcategory.create({
        name: sub.name,
        slug: sub.slug,
        icon: sub.icon,
        category: category, // Relation Category → Subcategory
      });

      await repoSubcategory.save(newSubcategory);
    }
  }
};
