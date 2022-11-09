import { CustomRepository } from 'src/config/typeorm-ex.decorator';
import { DataSource, Repository } from 'typeorm';
import { Posts } from '../entities/post.entity';
import { CreatePostDto } from '../dto/create-post.dto';

@CustomRepository(Posts)
export class PostRepository extends Repository<Posts> {
  datasource: DataSource;

  async onCreate(createPostDto: CreatePostDto, userId: number) {
    const { title, contents } = createPostDto;

    const post = await this.save({ title, contents, userId });
    return post;
  }

  async getAllPost() {
    return await this.find();
  }

  async getMyPosts(userId) {
    return await this.createQueryBuilder()
      .select('userId')
      .addSelect('title')
      .where(`userId = :userId`, { userId })
      .getRawMany();
    // return await this.findBy({ userId });
  }

  async getPostByUserId(userId, id) {
    return await this.findBy({ userId, id });
  }

  async getPostById(id) {
    return await this.findBy({ id });
  }

  async updatePost(id, updatePostDto) {
    const { title, contents } = updatePostDto;
    await this.update(id, { title, contents });
  }

  async deletePost(userId, id) {
    await this.delete({ id, userId });
  }
}
