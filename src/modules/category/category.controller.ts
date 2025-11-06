import { Controller, Get, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { IsAuthGuard } from '../../common/guards/auth.guard';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  @UseGuards(IsAuthGuard)
  getCategories(): Category[] {
    return this.categoryService.getAllCategories();
  }
}
