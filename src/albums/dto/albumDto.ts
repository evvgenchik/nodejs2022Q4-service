import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class AlbumDto {
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty()
  readonly name: string;
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  readonly artistId: string | null; // refers to Artist
  @IsInt()
  @IsNotEmpty()
  year: number;
}
