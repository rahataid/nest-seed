// src/main.ts

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PORT } from 'src/config';
import { AppModule } from './app.module';
import { RsExceptionFilter } from './utils/exceptions/rs-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalFilters(new RsExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Rahat Impactflow')
    .setDescription('Rahat Impactflow')
    .setVersion('0.1')
    .setBasePath('/api/v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  console.log(`Listening on port ${PORT}...`);
  console.log(`Swagger UI: http://localhost:${PORT}/api/docs`);

  await app.listen(PORT);
}
bootstrap();
