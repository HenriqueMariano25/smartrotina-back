import { Injectable } from '@nestjs/common';
import { ListaProdutosRepository } from './repositories/listaProdutos.repository';
import { CadastrarListaProdutosControllerDto } from './dto/controller/cadastrar-lista-produtos.controller.dto';
import { CadastrarResidenciaRepositoryDto } from '../residencia/dto/repository/cadastrar-residencia.repository.dto';
import { EditarListaProdutosRepositoryDto } from './dto/repository/editar-lista-produtos.repository.dto';
import { EditarListaProdutosControllerDto } from './dto/controller/editar-lista-produtos.controller.dto';
import { CadastrarProdutoControllerDto } from '../produto/dto/controller/cadastrar-produto.controller.dto';
import { CadastrarProdutoRepositoryDto } from '../produto/dto/repository/cadastrar-produto.repository.dto';
import { CadastrarTipoProdutoControllerDto } from './dto/controller/cadastrar-tipo-produto.controller.dto';
import { CadastrarTipoProdutoRepositoryDto } from './dto/repository/cadastrar-tipo-produto.repository.dto';
import { TipoProdutoRepository } from './repositories/tipoProduto.repository';
import { EditarTipoProdutoControllerDto } from './dto/controller/editar-tipo-produto.controller.dto';
import { EditarProdutoControllerDto } from './dto/controller/editar-produto.controller.dto';
import { ProdutoService } from '../produto/produto.service';
import { ProdutoListaProdutoRepository } from './repositories/produtoListaProduto.repository';
import { CadastrarProdutoListaProdutoRepositoryDto } from './dto/repository/cadastrar-produto-lista-produto.repository.dto';
import { AdicionarProdutoListaControllerDto } from './dto/controller/adicionar-produto-lista.controller.dto';

@Injectable()
export class ListaProdutosService {
  constructor(
    private readonly listaProdutosRepository: ListaProdutosRepository,
    private readonly tipoProdutoRepository: TipoProdutoRepository,
    private readonly produtoService: ProdutoService,
    private readonly produtoListaProdutoRepository: ProdutoListaProdutoRepository,
  ) {}

  async cadastrar(
    usuarioId: number,
    dadosDto: CadastrarListaProdutosControllerDto,
  ) {
    const dadosPrCadastrar: CadastrarResidenciaRepositoryDto = {
      usuarioId,
      ...dadosDto,
    };

    return await this.listaProdutosRepository.cadastrar(dadosPrCadastrar);
  }

  async buscarPorUsuario(usuarioId: number) {
    return await this.listaProdutosRepository.buscarPorUsuario(usuarioId);
  }

  async buscarUm(id: number) {
    return await this.listaProdutosRepository.buscarUm(id);
  }

  async editar(id: number, dadosDto: EditarListaProdutosControllerDto) {
    await this.listaProdutosRepository.editar(id, dadosDto);

    return this.buscarUm(id);
  }

  async adicionarProdutoLista(
    usuarioId: number,
    listaProdutosId: number,
    dadosDto: AdicionarProdutoListaControllerDto,
  ) {
    const produtoEncontrado = await this.produtoService.buscarUmPorNome(
      dadosDto.nome,
      usuarioId,
    );

    let produtoId: number | null = null;
    if (!produtoEncontrado) {
      const dadosCadastrarProdutos: CadastrarProdutoControllerDto = {
        nome: dadosDto.nome,
        tipoProdutoId: dadosDto.tipoProdutoId,
        observacao: dadosDto.observacao,
      };

      const produtoCadastrado = await this.produtoService.cadastrar(
        usuarioId,
        dadosCadastrarProdutos,
      );
      produtoId = produtoCadastrado.id;
    } else {
      produtoId = produtoEncontrado.id;
    }

    const dadosPrCadastrarProdutoLista: CadastrarProdutoListaProdutoRepositoryDto =
      {
        produtoId,
        listaProdutosId,
        valor: dadosDto.valor,
        quantidade: dadosDto.quantidade,
        unidade: dadosDto.unidade,
      };

    const produtoListaCriado =
      await this.produtoListaProdutoRepository.cadastrar(
        dadosPrCadastrarProdutoLista,
      );

    // const itemCriad

    return await this.produtoListaProdutoRepository.buscarUm(
      produtoListaCriado.id,
    );
  }

  // async buscarProdutosPorListaProdutos(listaProdutosId: number) {
  //   return await this.produtoRepository.buscarPorListaProdutos(listaProdutosId);
  // }
  //
  // async buscarUmProduto(id: number) {
  //   return await this.produtoRepository.buscarUm(id);
  // }
  //
  // async editarProduto(id: number, dadoDto: EditarProdutoControllerDto) {
  //   return await this.produtoRepository.editar(id, dadoDto);
  // }
  //
  // async editarValorProduto(id: number, valor: number) {
  //   return await this.produtoRepository.editarValor(id, valor);
  // }

  async cadastrarTipoProduto(
    usuarioId: number,
    dadosDto: CadastrarTipoProdutoControllerDto,
  ) {
    const dados: CadastrarTipoProdutoRepositoryDto = {
      ...dadosDto,
      usuarioId,
    };

    return await this.tipoProdutoRepository.cadastrar(dados);
  }

  async buscarTipoProdutoProUsuario(usuarioId: number) {
    return await this.tipoProdutoRepository.buscarPorUsuario(usuarioId);
  }

  async editarTipoProduto(
    id: number,
    dadosDto: EditarTipoProdutoControllerDto,
  ) {
    return await this.tipoProdutoRepository.editar(id, dadosDto);
  }

  async deletarTipoProduto(id: number) {
    return await this.tipoProdutoRepository.deletar(id);
  }
}
