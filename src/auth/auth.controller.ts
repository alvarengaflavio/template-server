import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { exceptionsFilter } from 'src/common/helpers/exceptions-helper';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Sign up',
    description:
      'Sign up a new user with username and password credentials. Username must be lowercase. Password must be at least 8 characters long, and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.',
  })
  signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    try {
      return this.authService.signUp(createUserDto);
    } catch (error) {
      exceptionsFilter(error);
    }
  }

  @Post('/login')
  login(@Body(ValidationPipe) createAuthDto: AuthCredentialsDto) {
    try {
      return this.authService.login(createAuthDto);
    } catch (error) {
      exceptionsFilter(error);
    }
  }

  @Get()
  logged() {
    return this.authService.logged();
  }
}
