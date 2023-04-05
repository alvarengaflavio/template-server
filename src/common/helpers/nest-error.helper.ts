import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Error } from '../types/types';

export function nestErrorHelper(error: Error) {
  if (error?.message?.includes('\n')) {
    const errorArray: string[] = error.message?.split('\n');
    error.message = errorArray[errorArray.length - 1];
  }

  const errorsMap = new Map([
    [
      'BadRequestError',
      new BadRequestException(error.message ?? 'Bad Request'),
    ],
    ['ConflictError', new ConflictException(error.message)],
    ['NotFoundError', new NotFoundException(error.message)],
    ['UnauthorizedError', new UnauthorizedException(error.message)],
    [
      'UnprocessableEntityError',
      new UnprocessableEntityException(
        error.message ?? 'Patient already have a room',
      ),
    ],
    [
      'default',
      new InternalServerErrorException(error.message ?? 'Bad Request'),
    ],
  ]);

  const exception = errorsMap.get(error.name) ?? errorsMap.get('default');
  throw exception;
}
