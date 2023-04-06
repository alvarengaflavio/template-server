import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { exceptionsFilter } from 'src/common/helpers/exceptions-helper';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Sign up a new user',
    description:
      'Sign up a new user with username and password credentials. Username must be lowercase. Password must be at least 8 characters long, and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.',
  })
  async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    try {
      return await this.authService.signUp(createUserDto);
    } catch (error) {
      exceptionsFilter(error);
    }
  }

  @Post('/signin')
  @ApiOperation({
    summary: 'Sign in with username and password',
    description:
      'Login with username and password credentials. Username must be lowercase. Password must be at least 8 characters long, and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.',
  })
  async signIn(@Body(ValidationPipe) createAuthDto: AuthCredentialsDto) {
    try {
      return await this.authService.signIn(createAuthDto);
    } catch (error) {
      exceptionsFilter(error);
    }
  }

  @Get('/signed')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Returns authenticated user',
    description: 'Check if logged, return authenticated user',
  })
  async signed(@GetUser() user: User) {
    return user;
  }
}
