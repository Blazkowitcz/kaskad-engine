import { IsString } from 'class-validator';

export class AddCategoryDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  filename: string;

  @IsString()
  subcategory: string;

  @IsString()
  description: string;

  @IsString()
  mediainfo: string;
}
