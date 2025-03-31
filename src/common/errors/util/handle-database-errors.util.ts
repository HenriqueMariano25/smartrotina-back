import { DatabaseError } from '../types/DatabaseError';
import { ForeignKeyConstrainError } from '../types/ForeignKeyConstraintError';
import { NotFoundError } from '../types/NotFoundError';
import { PrismaClienteError } from '../types/PrismaClientError';
import { UniqueConstraintError } from '../types/UniqueConstraintError';

enum PrismaErrors {
  UniqueConstraintFail = 'P2002',
  NotFoundFail = 'P2025',
  ForeignKeyConstraintFail = 'P2003',
}

export const handleDatabaseErrors = (e: PrismaClienteError): Error => {
  switch (e.code) {
    case PrismaErrors.UniqueConstraintFail:
      return new UniqueConstraintError(e);

    case PrismaErrors.NotFoundFail:
      return new NotFoundError(e);

    case PrismaErrors.ForeignKeyConstraintFail:
      return new ForeignKeyConstrainError(e);

    default:
      return new DatabaseError(e.message);
  }
};
