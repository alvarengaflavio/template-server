import { Injectable, Logger } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtPayload } from 'src/common/types/types';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async login(authCredentialsDto: AuthCredentialsDto) {
    const email = await this.userRepository.login(authCredentialsDto);
    const payload: JwtPayload = { email };
    const accessToken = await this.jwtService.signAsync(payload);

    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return { accessToken };
  }

  logged() {
    return `This action returns all auth`;
  }
}
