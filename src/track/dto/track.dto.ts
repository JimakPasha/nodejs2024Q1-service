import { IsString, IsNumber, IsOptional } from 'class-validator';

export class TrackDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @IsOptional()
  albumId: string | null;
}
