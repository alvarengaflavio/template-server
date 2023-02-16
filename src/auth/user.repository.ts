import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

// Não implementado
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt(); // generate unique salt for each user
    user.password = await this.hashPassword(password, user.salt);

    await this.save(user).catch((err) => {});
  }

  async updateName(id: number, name: string): Promise<Partial<User>> {
    const user = await this.findOneBy({ id });

    user.name = name;

    await this.save(user).catch((err) => {});

    return { id: user.id, username: user.username, name: user.name };
  }

  async deleteUser(id: number): Promise<void> {
    await this.delete(id).catch((err) => {});
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ where: { username } });

    if (user && (await this.validatePassword(password, user.password))) {
      return user.username;
    }

    return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  private async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const teste = await bcrypt.compare(password, hashedPassword);

    return teste;
  }
}
