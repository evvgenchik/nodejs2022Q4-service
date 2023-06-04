import { IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Must be a string' })
  @Length(1, 40)
  readonly oldPassword: string;
  @IsString({ message: 'Must be a string' })
  @Length(1, 20)
  readonly newPassword: string;
}
