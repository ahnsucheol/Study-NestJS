import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmExModule } from 'src/config/typeorm-ex.module';
import { PostRepository } from '../repositories/post.repository';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([PostRepository])],
  controllers: [PostsController],
  providers: [PostsService, AuthService],
})
export class PostsModule {}
