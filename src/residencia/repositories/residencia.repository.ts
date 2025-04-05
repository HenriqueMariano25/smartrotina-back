import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CadastrarResidenciaRepositoryDto } from '../dto/repository/cadastrar-residencia.repository.dto';
import { ResidenciaEntity } from '../entities/Residencia.entity';

@Injectable()
export class ResidenciaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CadastrarResidenciaRepositoryDto) {
    return this.prisma.residencia.create({ data });
  }

  async buscarTodos(): Promise<ResidenciaEntity[]> {
    return this.prisma.residencia.findMany();
  }

  async buscarPorNomeUsuario(usuarioId: number, nome: string) {
    return this.prisma.residencia.findFirst({
      where: {
        usuarioId,
        nome,
      },
    });
  }

  async buscarPorUsuario(usuarioId: number) {
    return this.prisma.residencia.findMany({
      where: {
        OR: [
          {
            morador: {
              some: { usuarioId },
            },
          },
          { usuarioId },
        ],
        deletadoEm: null,
      },
    });
  }

  async buscarPorResponsaveis(id: number) {
    return this.prisma.morador.findMany({ where: { residenciaId: id, NOT: { usuarioId: null } } });
  }
}
