import { IsString, IsInt, IsOptional, IsNotEmpty } from 'class-validator';

export class TrackDto {
  @IsString({ message: 'Must be a string' })
  @IsNotEmpty()
  readonly name: string;
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  readonly artistId: string | null; // refers to Artist
  @IsOptional()
  @IsString({ message: 'Must be a string' })
  readonly albumId: string | null; // refers to Album
  @IsInt()
  @IsNotEmpty()
  readonly duration: number; // integer number
}
