import { Exclude } from 'class-transformer';
import { Transform } from '@nestjs/class-transformer';

export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: string;
  login: string;
  version: number;

  @Transform(({ value }) => +value)
  createdAt: Date;

  @Transform(({ value }) => +value)
  updatedAt: Date;

  @Exclude()
  password: string;

  @Exclude()
  hashedRefreshToken?: string;
}
