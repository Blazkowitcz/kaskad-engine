import { IsString, IsNumber } from 'class-validator';

export class AddPeerDto {
  @IsString()
  hash?: string;

  @IsString()
  ip?: string;

  @IsNumber()
  port?: number;
}
