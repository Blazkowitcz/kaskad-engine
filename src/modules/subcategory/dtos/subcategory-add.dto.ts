import { IsString, IsObject } from 'class-validator';

export class AddSubcategoryDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsObject()
  category: object;
}
