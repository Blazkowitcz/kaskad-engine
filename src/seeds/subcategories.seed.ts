import { DataSource } from 'typeorm';
import { Subcategory } from '../modules/subcategory/subcategory.entity';
import { Category } from '../modules/category/category.entity';

export const seedSubcategories = async (dataSource: DataSource) => {
  const repoSubcategory = dataSource.getRepository(Subcategory);
  const repoCategory = dataSource.getRepository(Category);
  const categories: Category[] = await repoCategory.find();

  const subcategories = [
    {
      name: 'Documentaires',
      slug: 'documentaries',
      icon: 'documentaries',
      category: 'videos',
    },
    {
      name: 'Emissions',
      slug: 'emissions',
      icon: 'people',
      category: 'videos',
    },
    {
      name: 'Films',
      slug: 'films',
      icon: 'people',
      category: 'videos',
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
