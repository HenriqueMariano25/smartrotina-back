import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CadastrarCompraRepositoryDto } from '../dto/repository/cadastrar-compra.repository.dto';
import { EditarCompraRepositoryDto } from '../dto/repository/editar-compra.repository.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompraRepository {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CadastrarCompraRepositoryDto) {
    return this.prisma.compra.create({ data });
  }

  async cadastrarComTransacao(
    data: CadastrarCompraRepositoryDto,
    transacaoCtx: Prisma.TransactionClient,
  ) {
    return transacaoCtx.compra.create({ data });
  }

  async editar(id: number, data: EditarCompraRepositoryDto) {
    return this.prisma.compra.update({ where: { id }, data });
  }

  async buscarUm(id: number) {
    return this.prisma.compra.findUnique({ where: { id } });
  }

  async buscarPorUsuario(usuarioId: number) {
    return this.prisma.compra.findMany({
      where: { usuarioId },
      include: {
        mercado: { select: { id: true, nome: true } },
        formaPagamento: { select: { id: true, descricao: true } },
      },
    });
  }
}
