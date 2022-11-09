import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './config/typeorm.config';
import { ExceptionModule } from './exceptions/exception.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    PostsModule,
    UsersModule,
    ExceptionModule,
  ],
})
export class AppModule {}
