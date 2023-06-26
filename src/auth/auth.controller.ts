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
import { CreateUserDto } from 'src/users/dto/createUserDto';
import { LocalAuthenticationGuard } from './authLocal.guard';
import { Public } from 'src/common/docorators/public.decorator';
import JwtRefreshGuard from './jwt-authRefresh.guard copy';

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
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request) {
    return this.authService.refresh(request.user);
  }
}
