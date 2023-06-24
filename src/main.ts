import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'node:fs/promises';
import * as path from 'path';
import { HttpExceptionFilter } from './exceptionFilter/exceptionFilter';
import { MyLogger } from './logger/my-logger.service';

const addUncaughtHandlers = (logger: MyLogger) => {
  process.on('unhandledRejection', (err) =>
    logger.error(`unhandledRejection ${err}`),
  );
  process.on('uncaughtException', (err) =>
    logger.error(`uncaughtException ${err}`),
  );
};

async function bootstrap() {
  const PORT = process.env.PORT || 4001;
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  const pathToFile = path.join(__dirname, '../doc/doc.json');
  const document = JSON.parse(await readFile(pathToFile, { encoding: 'utf8' }));
  SwaggerModule.setup('doc', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());
  //app.useGlobalPipes(new ValidationPipe());

  // setTimeout(() => Promise.reject(new Error('unhandledRejection test')), 1);
  // setTimeout(() => {
  //   throw new Error('uncaughtException test');
  // }, 1);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

  const logger = app.get<MyLogger>(MyLogger);
  addUncaughtHandlers(logger);
}

bootstrap();
