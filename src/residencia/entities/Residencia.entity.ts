import { residencia } from '@prisma/client';

export class ResidenciaEntity implements residencia {
  id: number;
  nome: string;
  ehFavorito: boolean;
  criadoEm: Date;
  editadoEm: Date;
  deletadoEm: Date | null;
  usuarioId: number;
}
