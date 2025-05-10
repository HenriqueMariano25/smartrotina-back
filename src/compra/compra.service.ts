import { Injectable } from '@nestjs/common';
import { CompraRepository } from './repositories/compra.repository';
import { FormaPagamentoRepository } from './repositories/formaPagamento.repository';
import { CadastrarCompraControllerDto } from './dto/controller/cadastrar-compra.controller.dto';
import * as _ from 'lodash';
import { ListaProdutosService } from '../lista-produtos/lista-produtos.service';
import { PrismaService } from '../config/prisma/prisma.service';
import { BuscarRelatorioComprasMesControllerDto } from './dto/controller/buscar-relatorio-compras-mes.controller.dto';
import * as dayjs from 'dayjs';

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

  async buscarPorUsuario(usuarioId: number) {
    return this.compraRepository.buscarPorUsuario(usuarioId);
  }

  async buscarTodosFormaPagamento() {
    return this.formaPagmentoRepository.buscarTodos();
  }

  async buscarRelatorioComprasPorMes(
    usuarioId: number,
    dadosDto: BuscarRelatorioComprasMesControllerDto,
  ) {
    const { mesAno } = dadosDto;
    const [mes, ano] = mesAno.split('/');
    const dataInicio = `01/${mesAno}`;

    const dataFim = dayjs()
      .date(31)
      .month(parseInt(mes) - 1)
      .year(parseInt(ano))
      .hour(0)
      .minute(0)
      .toISOString();

    const compras = await this.compraRepository.buscarComprasPorMes(
      dataInicio,
      dataFim,
      usuarioId,
    );

    const comprasAgrupadas: { nome: string; valor: number }[] = [];
    for (const compra of compras) {
      const formaPagamento = compra.formaPagamento.descricao;
      const indexCompraAgrupada = _.findIndex(comprasAgrupadas, [
        'nome',
        formaPagamento,
      ]);

      if (indexCompraAgrupada < 0) {
        comprasAgrupadas.push({ nome: formaPagamento, valor: compra.valor });
      } else {
        comprasAgrupadas[indexCompraAgrupada].valor += compra.valor;
      }
    }

    return comprasAgrupadas;
  }
}
