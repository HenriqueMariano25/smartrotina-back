import { Injectable } from '@nestjs/common';
import { CompraRepository } from './repositories/compra.repository';
import { FormaPagamentoRepository } from './repositories/formaPagamento.repository';
import { CadastrarCompraControllerDto } from './dto/controller/cadastrar-compra.controller.dto';
import * as _ from 'lodash';
import { ListaProdutosService } from '../lista-produtos/lista-produtos.service';
import { PrismaService } from '../config/prisma/prisma.service';

@Injectable()
export class CompraService {
  constructor(
    private readonly compraRepository: CompraRepository,
    private readonly formaPagmentoRepository: FormaPagamentoRepository,
    private readonly listaProdutosService: ListaProdutosService,
    private readonly prisma: PrismaService,
  ) {}

  async cadastrar(usuarioId: number, dadosDto: CadastrarCompraControllerDto) {
    return this.prisma.$transaction(async (transacaoCtx) => {
      const dadosCompra = {
        ..._.omit(dadosDto, ['produtosListaProdutos']),
        usuarioId,
      };

      const compraCadastrada =
        await this.compraRepository.cadastrarComTransacao(
          dadosCompra,
          transacaoCtx,
        );

      const produtosCompradosId = dadosDto.produtosListaProdutos;
      for (const id of produtosCompradosId) {
        await this.listaProdutosService.comprarProdutoListaProdutoComTransacao(
          id,
          compraCadastrada.id,
          transacaoCtx,
        );
      }
    });
  }

  async buscarTodosFormaPagamento() {
    return this.formaPagmentoRepository.buscarTodos();
  }
}
