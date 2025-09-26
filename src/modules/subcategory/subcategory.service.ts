import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subcategory } from './subcategory.entity';
import { AddSubcategoryDto } from './dtos/subcategory-add.dto';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectRepository(Subcategory)
    private readonly subcategoryRepository: Repository<Subcategory>,
  ) {}

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
