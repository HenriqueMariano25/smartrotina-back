import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CadastrarRotinaRepositoryDto } from '../dto/repository/cadastrar-rotina.repository.dto';
import { EditarRotinaRepositoryDto } from '../dto/repository/editar-rotina.repository.dto';

@Injectable()
export class RotinaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CadastrarRotinaRepositoryDto) {
    return await this.prisma.rotina.create({ data });
  }

  async buscarPorUsuario(usuarioId: number) {
    return this.prisma.rotina.findMany({
      where: {
        OR: [
          {
            usuarioId,
          },
          { residencia: { usuarioId } },
          { residencia: { morador: { some: { usuarioId } } } },
        ],
      },
      include: {
        responsavel: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  }

  async editar(id: number, data: EditarRotinaRepositoryDto) {
    return await this.prisma.rotina.update({ where: { id }, data });
  }

  async buscarUm(id: number) {
    return await this.prisma.rotina.findUnique({
      where: { id },
      include: {
        responsavel: {
          select: {
            id: true,
            nome: true,
          },
        },
      },
    });
  }
}
