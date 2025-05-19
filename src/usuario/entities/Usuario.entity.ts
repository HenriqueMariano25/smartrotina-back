import { usuario } from '@prisma/client';

export class UsuarioEntity implements usuario {
  ultimoLogin: Date | null;
  bloqueadoEm: Date | null;
  administrador: boolean | null;
  id: number;
  nome: string;
  email: string;
  senha: string;
  criadoEm: Date;
  editadoEm: Date;
  deletadoEm: Date | null;
}
