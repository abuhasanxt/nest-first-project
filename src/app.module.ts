import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { BookModule } from './book/book.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UsersModule } from './users/users.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/ormconfig.js';




@Module({
  imports: [TypeOrmModule.forRoot(ormConfig),BookModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
