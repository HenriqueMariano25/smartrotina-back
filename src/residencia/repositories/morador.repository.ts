import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CadastrarMoradorRepositoryDto } from '../dto/repository/cadastrar-morador.repository.dto';
import { EditarMoradorRepositoryDto } from '../dto/repository/editar-morador.repository.dto';

@Injectable()
export class MoradorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CadastrarMoradorRepositoryDto) {
    return this.prisma.morador.create({ data });
  }

  async buscarMoradorPorResidencia(residenciaId: number) {
    return this.prisma.morador.findMany({
      where: {
        residenciaId,
        deletadoEm: null,
      },
    });
  }

  async editar(id: number, data: EditarMoradorRepositoryDto) {
    return this.prisma.morador.update({ where: { id }, data });
  }

  async deletar(id: number) {
    return this.prisma.morador.update({
      where: { id },
      data: { deletadoEm: new Date() },
    });
  }
}
