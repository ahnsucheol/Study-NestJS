import {
  ConflictException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserRepository } from '../repositories/user.repository';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async onCreate(createUserDto: CreateUserDto): Promise<boolean> {
    const { email, password } = createUserDto;
    const user = await this.userRepository.getUserByEmail(email);
    if (user) {
      throw new ConflictException('Duplicated Email');
    }
    const hashedPassword: string = await bcryptjs.hash(password, 10);
    return await this.userRepository.onCreate(createUserDto, hashedPassword);
  }

  async login(
    email: string,
    password: string,
  ): Promise<boolean | string | jwt.JwtPayload> {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('Not Correct User');
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      throw new NotAcceptableException('Wrong password');
    }
    return this.authService.login(user.id);
  }

  async remove(token: string) {
    const userId = this.authService.verifyToken(token);
    await this.userRepository.deleteUser(userId);
  }
}
