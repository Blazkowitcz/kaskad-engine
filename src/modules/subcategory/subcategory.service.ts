import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  Logger,
  NotAcceptableException,
  OnModuleInit,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subcategory } from './subcategory.entity';
import { AddSubcategoryDto } from './dtos/subcategory-add.dto';
import { FIELDS } from '../../constants';

@Injectable()
export class SubcategoryService implements OnModuleInit {
  private subcategories: Subcategory[] = [];
  private readonly logger = new Logger(`SubcategoryCache`);
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
  ) {}

  async onModuleInit() {
    this.subcategories = await this.subcategoryRepository.find({
      relations: [FIELDS.CATEGORY],
    });
    this.logger.log(
      `Subcategory cache loaded with ${this.subcategories.length} entries`,
    );
  }

  /**
   * Add new subcategory
   * @param addSubcategoryDto {AddSubcategoryDto}
   * @returns {Subcategory}
   */
  async addSubcategory(addSubcategoryDto: AddSubcategoryDto) {
    let subcategory = await this.subcategoryRepository.findOne({
      where: { slug: addSubcategoryDto.slug },
    });
    if (subcategory) {
      throw new NotAcceptableException('Subcategory already exists');
    }
    subcategory = this.subcategoryRepository.create(addSubcategoryDto);
    return await this.subcategoryRepository.save(subcategory);
  }

  getAllSubcategories(): Subcategory[] {
    return this.subcategories;
  }

  /**
   * Get subcategories from category
   * @param categoryId {String}
   * @returns {Subcategory[]}
   */
  async getSubcategoriesFromCategory(categoryId: string) {
    return await this.subcategoryRepository.find({
      where: { category: { id: categoryId } },
    });
  }

  /**
   * Get subcategory from its ID
   * @param subcategoryId {String}
   * @returns {Subcategory}
   */
  async getSubcategoryById(subcategoryId: string) {
    return await this.subcategoryRepository.findOneByOrFail({
      id: subcategoryId,
    });
  }
}
