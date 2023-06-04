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
  HttpCode,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { AlbumDto } from './dto/albumDto';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}
  @Get('')
  getAll() {
    return this.albumsService.getAll();
  }
  @Get(':id')
  get(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumsService.get(id);
  }

  @UsePipes(ValidationPipe)
  @Post('')
  create(@Body() dto: AlbumDto) {
    return this.albumsService.create(dto);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: AlbumDto) {
    return this.albumsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumsService.delete(id);
  }
}
