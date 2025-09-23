import { IsString } from 'class-validator';

export class AddTorrentDto {
  @IsString()
  name: string;

  @IsString()
  subcategory: string;

  @IsString()
  description: string;

  @IsString()
  mediainfo: string;

  @IsString()
  languages?: string;
}
