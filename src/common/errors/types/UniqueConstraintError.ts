import { ConflictError } from './ConflictError';
import { PrismaClienteError } from './PrismaClientError';

export class UniqueConstraintError extends ConflictError {
  constructor(e: PrismaClienteError) {
    const uniqueField = e.meta?.target;

    super(`Já existe um registro com esse ${uniqueField}.`);
  }
}
