import { usuario } from '@prisma/client';

export class UsuarioEntity implements usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  criadoEm: Date;
  editadoEm: Date;
  deletadoEm: Date | null;
}
