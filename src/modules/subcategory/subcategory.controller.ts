import { Controller, Get, UseGuards } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { IsAuthGuard } from '../../common/guards/auth.guard';
import { Subcategory } from './subcategory.entity';

@Controller('subcategories')
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Get('')
  @UseGuards(IsAuthGuard)
  getSubcategories(): Subcategory[] {
    return this.subcategoryService.getAllSubcategories();
  }
}
