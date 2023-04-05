import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password' | 'salt'>> {
    const { name, email, password, confirmPassword } = createUserDto;

    if (password !== confirmPassword) {
      throw new UnprocessableEntityException('Passwords do not match');
    }

    const user = new User();
    user.name = name;
    user.email = email;
    user.salt = await genSalt();
    user.password = await this.hashPassword(password, user.salt);

    await this.save(user).catch((err) => {
      //   typeOrmExceptionHelper(err);
      console.error(err);
      throw new UnprocessableEntityException('Error creating user');
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  async findAll(): Promise<User[]> {
    return await this.find({ select: ['id', 'name', 'email'] });
  }

  async findOneUser(id: number): Promise<User> {
    const user = await this.findOne({
      where: { id },
      select: ['id', 'name', 'email'],
    });
    if (!user) throw new NotFoundException(`User with id '${id}' not found`);

    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const teste = await compare(password, hashedPassword);

    return teste;
  }
}
