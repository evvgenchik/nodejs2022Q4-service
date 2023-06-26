import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Request,
  Response,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { LocalAuthenticationGuard } from './authLocal.guard';
import { Public } from 'src/common/docorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() signupDto: CreateUserDto) {
    return this.authService.signup(signupDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  login(@Request() req, @Response() res) {
    const cookie = this.authService.login(req.user);
    res.setHeader('Set-Cookie', cookie);
    return res.send();
    // const { user } = loginDto;
    // const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    // response.setHeader('Set-Cookie', cookie);
    // user.password = undefined;
    // return response.send(user);
    // return this.authService.login(loginDto.login, loginDto.password);
  }
}
