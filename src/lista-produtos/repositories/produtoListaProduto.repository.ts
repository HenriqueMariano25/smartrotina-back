import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CadastrarProdutoListaProdutoRepositoryDto } from '../dto/repository/cadastrar-produto-lista-produto.repository.dto';
import { EStatusProdutoLista } from '../../common/enums/statusProdutoLista';

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
      include: { produto: { select: { id: true, nome: true } } },
    });
  }
}
