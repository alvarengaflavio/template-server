import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { typeOrmExceptionHelper } from 'src/common/helpers/type-orm-error.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  private readonly logger = new Logger('UserController');

  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new User',
  })
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      typeOrmExceptionHelper(error);
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      typeOrmExceptionHelper(error);
    }
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description:
      'Get a user by ID. The ID is passed as a parameter in the URL.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      typeOrmExceptionHelper(error);
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a user by ID',
    description:
      'Update a user by ID. The ID is passed as a parameter in the URL.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ whitelist: true }))
    updateUserDto: UpdateUserDto,
  ) {
    try {
      this.logger.debug(`Updating user with id ${id}`);
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      typeOrmExceptionHelper(error);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a user by ID',
    description:
      'Delete a user by ID. The ID is passed as a parameter in the URL.',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      this.logger.debug(`Removing user with id ${id}`);
      await this.userService.remove(id);
    } catch (error) {
      typeOrmExceptionHelper(error);
    }
  }
}
