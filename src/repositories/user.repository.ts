import { Users } from '../entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { CustomRepository } from 'src/config/typeorm-ex.decorator';

@CustomRepository(Users)
export class UserRepository extends Repository<Users> {
  datasource: DataSource;

  async onCreate(createUserDto: CreateUserDto, hashedPassword: string) {
    const { name, email } = createUserDto;
    const password = hashedPassword;

    const user = await this.save({ name, email, password });
    console.log(user);

    return user ? true : false;
  }

  async getUserByEmail(email: string) {
    const user = await this.findOneBy({ email });

    return user;
  }

  async deleteUser(userId: number) {
    await this.delete({ id: userId });
  }
}
