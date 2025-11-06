import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  NotAcceptableException,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { AddCategoryDto } from './dtos/category-add.dto';
import { translate } from '../../helpers/i18n.helper';

@Injectable()
export class CategoryService implements OnModuleInit {
  private categories: Category[] = [];
  private readonly logger = new Logger(`CategoryCache`);

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async onModuleInit() {
    this.categories = await this.categoryRepository.find();
    this.logger.log(
      `Category cache loaded with ${this.categories.length} entries`,
    );
  }

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
    await this.categoryRepository.save(category);
    this.categories.push(category);
    return category;
  }

  /**
   * Get all categories
   * @returns {Category[]}
   */
  getAllCategories(): Category[] {
    return this.categories;
  }

  /**
   * Get category by its ID
   * @param id {String}
   * @returns {Category | null}
   */
  getCategoryById(id: string): Category | undefined {
    return this.categories.find((category: Category) => category.id === id);
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
