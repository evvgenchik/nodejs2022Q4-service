import { Exclude } from 'class-transformer';
import { Transform } from '@nestjs/class-transformer';

export class UserEntity {
  id: string;
  login: string;
  version: number;
  @Transform(({ value }) => +value)
  createdAt: number;
  @Transform(({ value }) => +value)
  updatedAt: number;
  @Exclude()
  password: string;

  // constructor(partial: Partial<UserEntity>) {
  //   Object.assign(this, partial);
  // }
}
