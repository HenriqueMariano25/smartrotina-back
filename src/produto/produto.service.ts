import { Injectable } from '@nestjs/common';
import { ProdutoRepository } from './repositories/produto.repository';
import { CadastrarProdutoControllerDto } from './dto/controller/cadastrar-produto.controller.dto';
import { CadastrarProdutoRepositoryDto } from './dto/repository/cadastrar-produto.repository.dto';
import { EditarProdutoControllerDto } from './dto/controller/editar-produto.controller.dto';

@Injectable()
export class ProdutoService {
  constructor(private readonly produtoRepository: ProdutoRepository) {}

  async cadastrar(usuarioId: number, dadosDto: CadastrarProdutoControllerDto) {
    const data: CadastrarProdutoRepositoryDto = {
      ...dadosDto,
      usuarioId,
    };

    return await this.produtoRepository.cadastrar(data);
  }

  async buscarUm(id: number) {
    return this.produtoRepository.buscarUm(id);
  }

  async buscarUmPorNome(nome: string, usuarioId: number) {
    return this.produtoRepository.buscarUmPorNome(nome, usuarioId);
  }

  async buscarPorUsuario(usuarioId: number) {
    return this.produtoRepository.buscarPorUsuario(usuarioId);
  }

  async editar(id: number, dadosDto: EditarProdutoControllerDto){
    return this.produtoRepository.editar(id, dadosDto);
  }

  async deletar(id: number) {
    return this.produtoRepository.deletar(id);
  }
}
