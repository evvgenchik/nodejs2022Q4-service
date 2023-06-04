import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Must be a string' })
  @Length(1, 40)
  readonly login: string;
  @IsString({ message: 'Must be a string' })
  @Length(1, 20)
  readonly password: string;
}
