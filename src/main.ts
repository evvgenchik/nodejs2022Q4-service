import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'node:fs/promises';
import * as path from 'path';
import { HttpExceptionFilter } from './exceptionFilter/exceptionFilter';
import { MyLogger } from './logger/my-logger.service';

async function bootstrap() {
  const PORT = process.env.PORT || 4001;
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  const pathToFile = path.join(__dirname, '../doc/doc.json');
  const document = JSON.parse(await readFile(pathToFile, { encoding: 'utf8' }));
  SwaggerModule.setup('doc', app, document);

  //const logger = app.get<MyLogger>(MyLogger);
  app.useGlobalFilters(new HttpExceptionFilter());
  //app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
