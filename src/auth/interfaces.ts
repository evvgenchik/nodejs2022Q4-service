import { Request } from 'express';
import { UserEntity } from '../users/userEntety';

export interface RequestWithUser extends Request {
  user: UserEntity;
}

export interface Payload {
  login: string;
  userId: string;
}
