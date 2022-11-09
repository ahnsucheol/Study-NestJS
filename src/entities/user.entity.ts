import { Posts } from 'src/entities/post.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ schema: 'study_nestjs', name: 'users' })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  signupVerifyToken: string;

  @OneToMany(() => Posts, (posts) => posts.userId)
  OwnedUserPosts: Posts[];
}
