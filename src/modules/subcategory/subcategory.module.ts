import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubcategoryService } from './subcategory.service';
import { Subcategory } from './subcategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subcategory])],
  providers: [SubcategoryService],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
