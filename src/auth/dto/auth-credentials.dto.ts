import { ApiProperty } from '@nestjs/swagger';
import {
  IsLowercase,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsLowercase()
  @ApiProperty({
    description: 'Username of the user. Must be lowercase.',
    example: 'myusername',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MinLength(8)
  @MaxLength(20)
  @ApiProperty({
    description:
      'Password of the user. Must be at least 8 characters long, and contain at least one lowercase letter, one uppercase letter, one number, and one symbol.',
    example: 'MyPassword123!',
  })
  password: string;
}
