import { IsString } from 'class-validator';

export class AddCategoryDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}
