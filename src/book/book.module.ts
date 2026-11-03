import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BookController } from './book.controller.js';
import { BookService } from './book.service.js';
import { LoggerMiddleware } from '../logger.middleware.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('book');
  }
}