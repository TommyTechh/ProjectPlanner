import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()) // enables data validation globally for the application
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT');
  await app.listen(port);
}
bootstrap();
