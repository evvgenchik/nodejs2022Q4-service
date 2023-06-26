import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          console.log(req?.cookies?.Authentication);

          return req?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: any) {
    return this.userService.get(payload.userId);
  }
}
