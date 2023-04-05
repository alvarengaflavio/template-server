import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new User',
  })
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description:
      'Get a user by ID. The ID is passed as a parameter in the URL.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
