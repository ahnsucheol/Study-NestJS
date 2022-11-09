import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Posts } from 'src/entities/post.entity';
import { Users } from 'src/entities/user.entity';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [Users, Posts],
  autoLoadEntities: true,
  synchronize: true, // 한번 true한 뒤로는 무조건 false
  charset: 'utf8mb4',
  logging: true,
  keepConnectionAlive: true,
};
