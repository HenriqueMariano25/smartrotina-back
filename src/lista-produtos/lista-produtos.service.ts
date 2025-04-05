import { Injectable } from '@nestjs/common';
import { ListaProdutosRepository } from './repositories/listaProdutos.repository';
import { CadastrarListaProdutosControllerDto } from './dto/controller/cadastrar-lista-produtos.controller.dto';
import { CadastrarResidenciaRepositoryDto } from '../residencia/dto/repository/cadastrar-residencia.repository.dto';
import { EditarListaProdutosRepositoryDto } from './dto/repository/editar-lista-produtos.repository.dto';
import { EditarListaProdutosControllerDto } from './dto/controller/editar-lista-produtos.controller.dto';

@Injectable()
export class ListaProdutosService {
  constructor(
    private readonly listaProdutosRepository: ListaProdutosRepository,
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

  async editar(id: number, dadosDto: EditarListaProdutosControllerDto){
    await this.listaProdutosRepository.editar(id, dadosDto);

    return this.buscarUm(id)
  }
}
