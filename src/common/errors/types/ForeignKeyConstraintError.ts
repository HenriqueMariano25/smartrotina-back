import { ConflictError } from './ConflictError';
import { PrismaClienteError } from './PrismaClientError';

export class ForeignKeyConstrainError extends ConflictError {
  constructor(e: PrismaClienteError) {
    const campo = e.meta?.field_name;
    if (typeof campo !== 'string') {
      throw new Error('Invalid field name');
    }
    const nome = campo.split('_');
    const nomeCampo = nome[nome.length - 1].split(' ')[0];

    super(`Erro com os dados informados na coluna ${nomeCampo}`);
  }
}
