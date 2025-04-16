import { Injectable } from '@nestjs/common';
import { ListaProdutosRepository } from './repositories/listaProdutos.repository';
import { CadastrarListaProdutosControllerDto } from './dto/controller/cadastrar-lista-produtos.controller.dto';
import { CadastrarResidenciaRepositoryDto } from '../residencia/dto/repository/cadastrar-residencia.repository.dto';
import { EditarListaProdutosRepositoryDto } from './dto/repository/editar-lista-produtos.repository.dto';
import { EditarListaProdutosControllerDto } from './dto/controller/editar-lista-produtos.controller.dto';
import { ProdutoRepository } from './repositories/produto.repository';
import { CadastrarProdutoControllerDto } from './dto/controller/cadastrar-produto.controller.dto';
import { CadastrarProdutoRepositoryDto } from './dto/repository/cadastrar-produto.repository.dto';
import { CadastrarTipoProdutoControllerDto } from './dto/controller/cadastrar-tipo-produto.controller.dto';
import { CadastrarTipoProdutoRepositoryDto } from './dto/repository/cadastrar-tipo-produto.repository.dto';
import { TipoProdutoRepository } from './repositories/tipoProduto.repository';
import { EditarTipoProdutoControllerDto } from './dto/controller/editar-tipo-produto.controller.dto';
import { EditarProdutoControllerDto } from './dto/controller/editar-produto.controller.dto';

@Injectable()
export class ListaProdutosService {
  constructor(
    private readonly listaProdutosRepository: ListaProdutosRepository,
    private readonly produtoRepository: ProdutoRepository,
    private readonly tipoProdutoRepository: TipoProdutoRepository,
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

  async cadastrarProduto(
    usuarioId: number,
    listaProdutosId: number,
    dadosDto: CadastrarProdutoControllerDto,
  ) {
    const dados: CadastrarProdutoRepositoryDto = {
      ...dadosDto,
      usuarioId,
      listaProdutosId,
    };

    return await this.produtoRepository.cadastrar(dados);
  }

  async buscarProdutosPorListaProdutos(listaProdutosId: number) {
    return await this.produtoRepository.buscarPorListaProdutos(listaProdutosId);
  }

  async buscarUmProduto(id: number) {
    return await this.produtoRepository.buscarUm(id);
  }

  async editarProduto(id: number, dadoDto: EditarProdutoControllerDto) {
    return await this.produtoRepository.editar(id, dadoDto);
  }

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
