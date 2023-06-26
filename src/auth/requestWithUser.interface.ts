import { Request } from 'express';
import { UserEntity } from '../users/userEntety';

interface RequestWithUser extends Request {
  user: UserEntity;
}

export default RequestWithUser;
