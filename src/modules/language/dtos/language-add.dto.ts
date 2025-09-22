import { IsString } from 'class-validator';

export class AddLanguageDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;
}
