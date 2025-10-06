import { IsString, IsBoolean } from 'class-validator';

export class EditTorrentDto {
  @IsString()
  id?: string;

  @IsString()
  name?: string;

  @IsString()
  subcategory?: string;

  @IsString()
  description?: string;

  @IsString()
  mediainfo?: string;

  @IsString()
  languages?: string;

  @IsBoolean()
  isFreeleech?: string;
}
