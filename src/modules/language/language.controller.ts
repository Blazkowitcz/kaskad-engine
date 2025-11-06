import { Controller, Get, UseGuards } from '@nestjs/common';
import { LanguageService } from './language.service';
import { IsAuthGuard } from '../../common/guards/auth.guard';
import { Language } from './language.entity';

@Controller('languages')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get('')
  @UseGuards(IsAuthGuard)
  async getLanguages(): Promise<Language[]> {
    return await this.languageService.getLanguages();
  }
}
