import { PrismaService } from '../../config/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CadastrarMercadoRepositoryDto } from '../dto/repository/cadastrar-mercado.repository.dto';
import { EditarMercadoRepositoryDto } from '../dto/repository/editar-mercado.repository.dto';

@Injectable()
export class MercadoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CadastrarMercadoRepositoryDto) {
    return this.prisma.mercado.create({ data });
  }

  async buscarPorUsuario(usuarioId: number) {
    return this.prisma.mercado.findMany({ where: { usuarioId } });
  }

  async buscarUm(id: number) {
    return this.prisma.mercado.findUnique({ where: { id } });
  }

  async editar(id: number, data: EditarMercadoRepositoryDto) {
    return this.prisma.mercado.update({ where: { id }, data });
  }
}
