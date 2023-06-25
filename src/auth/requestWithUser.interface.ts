import { Request } from 'express';
import { UserEntity } from 'src/users/userEntety';

interface RequestWithUser extends Request {
  user: UserEntity;
}

export default RequestWithUser;
