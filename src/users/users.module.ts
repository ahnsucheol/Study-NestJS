import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserRepository } from '../repositories/user.repository';
import { TypeOrmExModule } from 'src/config/typeorm-ex.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
