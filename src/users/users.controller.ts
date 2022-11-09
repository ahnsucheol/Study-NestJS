import {
  Controller,
  Post,
  Body,
  Delete,
  Headers,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from '../dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto): Promise<string> {
    await this.usersService.onCreate(createUserDto);
    return Object.assign({ message: 'signup successful' });
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  @HttpCode(201)
  async login(@Body() loginDto: LoginUserDto): Promise<object> {
    const { email, password } = loginDto;
    const token = await this.usersService.login(email, password);
    return Object.assign({ message: 'login successful', token: token });
  }

  @Delete()
  @HttpCode(400)
  remove(@Headers() headers: any) {
    const token = headers.authorization.split('Bearer ')[1];

    return this.usersService.remove(token);
  }
}
