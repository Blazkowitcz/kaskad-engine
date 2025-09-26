import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { AddCategoryDto } from './dtos/category-add.dto';
import { translate } from '../../helpers/i18n.helper';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  /**
   * Add new category
   * @param addCategoryDto {AddCategoryDto}
   * @returns {Category}
   */
  async addCategory(addCategoryDto: AddCategoryDto): Promise<Category> {
    let category: Category | null = await this.categoryRepository.findOne({
      where: { name: addCategoryDto.name },
    });
    if (category) {
      throw new NotAcceptableException(
        translate('category.failures.alreadyExist'),
      );
    }
    category = this.categoryRepository.create(addCategoryDto);
    return await this.categoryRepository.save(category);
  }

  /**
   * Get all categories
   * @returns {Category[]}
   */
  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  /**
   * Get category by its ID
   * @param id {String}
   * @returns {Category | null}
   */
  async getCategoryById(id: string): Promise<Category | null> {
    return await this.categoryRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * Get category by its slug
   * @param slug {String}
   * @returns {Category | null}
   */
  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return await this.categoryRepository.findOne({ where: { slug: slug } });
  }
}
