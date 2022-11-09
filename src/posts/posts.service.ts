import {
  ForbiddenException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

import { PostRepository } from '../repositories/post.repository';

import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
    private readonly authService: AuthService,
  ) {}

  async onCreate(createPostDto: CreatePostDto, token: string): Promise<object> {
    const userId: number = this.authService.verifyToken(token);

    return await this.postRepository.onCreate(createPostDto, userId);
  }

  async getAllPost(): Promise<object[]> {
    return await this.postRepository.getAllPost();
  }

  async getMyPosts(token: string): Promise<any> {
    const userId: number = this.authService.verifyToken(token);

    return await this.postRepository.getMyPosts(userId);
  }

  async updatePost(
    token: string,
    id: number,
    updatePostDto: UpdatePostDto,
  ): Promise<object> {
    const userId: number = this.authService.verifyToken(token);

    const post = await this.postRepository.getPostByUserId(userId, id);
    if (post.length < 1) {
      throw new NotAcceptableException('You are not Writter');
    }
    await this.postRepository.updatePost(id, updatePostDto);
    return this.postRepository.getPostById(id);
  }

  async deletePost(token: string, id: number): Promise<void> {
    const userId: number = this.authService.verifyToken(token);

    const post = await this.postRepository.getPostById(id);
    if (post.length < 1) {
      throw new NotFoundException(`Can't find id: ${id}`);
    }
    if (post[0].userId !== userId) {
      throw new ForbiddenException(`You are not writter`);
    }
    await this.postRepository.deletePost(userId, id);
  }
}
