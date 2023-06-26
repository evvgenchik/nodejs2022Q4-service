import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Request,
  Response,
  Get,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUserDto';
import { LocalAuthenticationGuard } from './authLocal.guard';
import { Public } from '../common/docorators/public.decorator';
import JwtRefreshGuard from './jwt-authRefresh.guard copy';
import { UsersService } from '../users/users.service';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() signupDto: CreateUserDto) {
    return this.authService.signup(signupDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Request() req) {
    const { refreshToken, accessToken } = this.authService.login(req.user);
    await this.usersService.setCurrentRefreshToken(
      refreshToken,
      req.user.login,
    );

    return { refreshToken, accessToken };
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request) {
    return this.authService.refresh(request.user);
  }
}
