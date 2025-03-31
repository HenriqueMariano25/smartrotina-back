import { ConflictError } from './ConflictError';
import { PrismaClienteError } from './PrismaClientError';

export class NotFoundError extends ConflictError {
  constructor(e: PrismaClienteError) {
    // const modelo = e.meta.modelName;
    const tabelaSemRegistro = e.meta?.cause?.toString().split(' ')[1];

    super(`Registro não encontrado na tabela ${tabelaSemRegistro}`);
  }
}
