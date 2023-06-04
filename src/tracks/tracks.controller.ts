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
import { TrackDto } from './dto/trackDto';
import { TracksService } from './tracks.service';

@Controller('track')
export class TracksController {
  constructor(private tracksService: TracksService) {}
  @Get('')
  getAll() {
    return this.tracksService.getAll();
  }
  @Get(':id')
  get(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tracksService.get(id);
  }

  @UsePipes(ValidationPipe)
  @Post('')
  create(@Body() dto: TrackDto) {
    return this.tracksService.create(dto);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() dto: TrackDto) {
    return this.tracksService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tracksService.delete(id);
  }
}
