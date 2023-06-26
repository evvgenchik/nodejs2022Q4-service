import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUserDto';
import { LocalAuthenticationGuard } from './guards/authLocal.guard';
import { Public } from '../common/docorators/public.decorator';
import JwtRefreshGuard from './guards/jwt-authRefresh.guard copy';
import { UsersService } from '../users/users.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { RequestWithUser } from './interfaces';

@Public()
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() signupDto: CreateUserDto) {
    return this.authService.signup(signupDto);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser) {
    const { refreshToken, accessToken } = this.authService.login(req.user);
    await this.usersService.setCurrentRefreshToken(
      refreshToken,
      req.user.login,
    );

    return { refreshToken, accessToken };
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  refresh(@Req() request: RequestWithUser) {
    return this.authService.refresh(request.user);
  }
}
