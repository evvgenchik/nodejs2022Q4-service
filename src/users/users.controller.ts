import {
  Controller,
  Body,
  Post,
  Get,
  UsePipes,
  ParseUUIDPipe,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { ValidationPipe } from 'src/pipes/validationPipe';

@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('')
  getAll() {
    return this.usersService.getAll();
  }
  get(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return this.usersService.get(uuid);
  }

  @UsePipes(ValidationPipe)
  @Post('')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }
}
