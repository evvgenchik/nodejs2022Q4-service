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
import { ArtistDto } from './dto/artistDto';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}
  @Get('')
  getAll() {
    return this.artistsService.getAll();
  }
  @Get(':id')
  get(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistsService.get(id);
  }

  @UsePipes(ValidationPipe)
  @Post('')
  create(@Body() dto: ArtistDto) {
    return this.artistsService.create(dto);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: ArtistDto) {
    return this.artistsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.artistsService.delete(id);
  }
}
