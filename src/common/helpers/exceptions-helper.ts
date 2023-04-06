import { Error } from '../types/types';
import { nestErrorHelper } from './nest-error.helper';
import { typeOrmExceptionHelper } from './type-orm-error.helper';

export function exceptionsFilter(error: Error) {
  'code' in error ? typeOrmExceptionHelper(error) : nestErrorHelper(error);
}
