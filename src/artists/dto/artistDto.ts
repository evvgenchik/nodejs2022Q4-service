import { IsString, Length, IsBoolean } from 'class-validator';

export class ArtistDto {
  @IsBoolean()
  readonly grammy: boolean;
  @IsString({ message: 'Must be a string' })
  @Length(1, 40)
  readonly name: string;
}
