import {
  Controller,
  Body,
  Post,
  Get,
  UsePipes,
  ParseUUIDPipe,
  Param,
  Put,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDto';
import { UsersService } from './users.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('')
  getAll() {
    return this.usersService.getAll();
  }
  @Get(':id')
  get(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.get(id);
  }

  @UsePipes(ValidationPipe)
  @Post('')
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.create(userDto);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, userDto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.delete(id);
  }
}
