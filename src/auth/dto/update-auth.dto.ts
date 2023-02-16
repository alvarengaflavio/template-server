import { PartialType } from '@nestjs/mapped-types';
import { AuthCredentialsDto } from './auth-credentials.dto';

export class UpdateAuthDto extends PartialType(AuthCredentialsDto) {}
