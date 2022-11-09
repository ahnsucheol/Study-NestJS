import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpCode,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  create(@Headers() headers: any, @Body() createPostDto: CreatePostDto) {
    const token = headers.authorization.split('Bearer ')[1];
    console.log(token);
    return this.postsService.onCreate(createPostDto, token);
  }

  @Get()
  @HttpCode(200)
  getAllPost(@Headers() headers: any) {
    if (!headers.authorization) {
      return this.postsService.getAllPost();
    }
    const token = headers.authorization.split('Bearer ')[1];
    return this.postsService.getMyPosts(token);
  }

  @Patch(':id')
  @HttpCode(201)
  updatePost(
    @Headers() headers: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const token = headers.authorization.split('Bearer ')[1];

    return this.postsService.updatePost(token, id, updatePostDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deletePost(@Headers() headers: any, @Param('id', ParseIntPipe) id: number) {
    const token = headers.authorization.split('Bearer ')[1];

    return this.postsService.deletePost(token, id);
  }
}
