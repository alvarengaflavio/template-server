import { Error } from '../types/types';
import { nestErrorHelper } from './nest-error.helper';

export function typeOrmExceptionHelper(err: Error) {
  console.error(err);
  switch (err?.code) {
    case '23505':
      nestErrorHelper({
        name: 'UnprocessableEntityError',
        message: err?.detail ?? err.message ?? 'Unique constraint failed',
      });

      break;

    default:
      nestErrorHelper({
        name: err.name ?? 'InternalServerError',
        message: err?.detail ?? err.message ?? 'Internal server error',
      });

      break;
  }
}
