import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Language } from './language.entity';
import { AddLanguageDto } from './dtos/language-add.dto';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  /**
   * Add new language
   * @param addLanguageDto {AddLanguageDto}
   * @returns {Language}
   */
  async addLanguage(addLanguageDto: AddLanguageDto): Promise<Language> {
    let language = await this.languageRepository.findOne({
      where: { slug: addLanguageDto.slug },
    });

    if (!language) {
      language = this.languageRepository.create(addLanguageDto);
      await this.languageRepository.save(language);
    }
    return language;
  }

  /**
   * Get all languages
   * @returns {Language[]}
   */
  async getLanguages(): Promise<Language[]> {
    return this.languageRepository.find();
  }

  /**
   * Get list of languages from slugs
   * @param slugArray {string[]}
   * @returns {Language[]}
   */
  async getLanguagesFromSlugArray(slugArray: string[]): Promise<Language[]> {
    return this.languageRepository.findBy({ slug: In(slugArray) });
  }
}
