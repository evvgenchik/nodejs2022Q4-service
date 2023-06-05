import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';
import * as path from 'path';

async function bootstrap() {
  const PORT = process.env.PORT || 4001;
  const app = await NestFactory.create(AppModule);

  const pathToFile = path.join(__dirname, '../doc/doc.json');
  const document = JSON.parse(readFileSync(pathToFile) as unknown as string);
  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}
bootstrap();
