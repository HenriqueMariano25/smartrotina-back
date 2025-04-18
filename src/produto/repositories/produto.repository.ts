import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CadastrarProdutoRepositoryDto } from '../dto/repository/cadastrar-produto.repository.dto';
import { EditarProdutoRepositoryDto } from '../dto/repository/editar-produto.repository.dto';

@Injectable()
export class ProdutoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CadastrarProdutoRepositoryDto) {
    return this.prisma.produto.create({
      data,
      include: { tipoProduto: { select: { id: true, descricao: true } } },
    });
  }

  async buscarUm(id: number) {
    return this.prisma.produto.findUnique({
      where: { id },
      include: {
        tipoProduto: {
          select: {
            id: true,
            descricao: true,
          },
        },
      },
    });
  }

  async buscarUmPorNome(nome: string, usuarioId: number) {
    return this.prisma.produto.findFirst({ where: { nome, usuarioId } });
  }

  async editar(id: number, data: EditarProdutoRepositoryDto) {
    return this.prisma.produto.update({
      where: { id },
      data,
      include: { tipoProduto: { select: { id: true, descricao: true } } },
    });
  }

  async buscarPorUsuario(usuarioId: number) {
    return this.prisma.produto.findMany({
      where: { usuarioId },
      include: {
        tipoProduto: {
          select: {
            id: true,
            descricao: true,
          },
        },
      },
      orderBy: { nome: 'asc' },
    });
  }

  async deletar(id: number) {
    return this.prisma.produto.delete({ where: { id } });
  }
}
