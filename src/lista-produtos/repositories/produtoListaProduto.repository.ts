import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CadastrarProdutoListaProdutoRepositoryDto } from '../dto/repository/cadastrar-produto-lista-produto.repository.dto';
import { EStatusProdutoLista } from '../../common/enums/statusProdutoLista';
import { EditarProdutoListaProdutoRepositoryDto } from '../dto/repository/editar-produto-lista-produto.repository.dto';

@Injectable()
export class ProdutoListaProdutoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(dadosDto: CadastrarProdutoListaProdutoRepositoryDto) {
    const data = {
      ...dadosDto,
      statusProdutoListaId: EStatusProdutoLista.LISTA_COMPRA,
    };
    return this.prisma.produtoListaProduto.create({ data });
  }

  async buscarUm(id: number) {
    return this.prisma.produtoListaProduto.findUnique({
      where: { id },
      include: {
        produto: { select: { id: true, nome: true, tipoProdutoId: true } },
      },
    });
  }

  async buscarPorListaProdutos(listaProdutosId: number) {
    return this.prisma.produtoListaProduto.findMany({
      where: { listaProdutosId },
      include: {
        produto: { select: { id: true, nome: true, observacao: true } },
      },
      orderBy: {
        produto: { nome: 'asc' },
      },
    });
  }

  async editar(id: number, data: EditarProdutoListaProdutoRepositoryDto) {
    return this.prisma.produtoListaProduto.update({
      where: { id },
      data,
      include: {
        produto: { select: { id: true, nome: true, observacao: true } },
      },
    });
  }

  async editarValor(id: number, valor: number) {
    return this.prisma.produtoListaProduto.update({
      where: { id },
      data: { valor },
    });
  }

  async editarStatus(id: number, statusProdutoListaId: number) {
    return this.prisma.produtoListaProduto.update({
      where: { id },
      data: { statusProdutoListaId },
    });
  }
}
