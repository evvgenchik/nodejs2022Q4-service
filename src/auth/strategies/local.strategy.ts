import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity } from '../../users/userEntety';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authenticationService: AuthService) {
    super({
      usernameField: 'login',
    });
  }
  async validate(login: string, password: string): Promise<UserEntity> {
    return this.authenticationService.validateUser(login, password);
  }
}
