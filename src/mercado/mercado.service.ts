import { Injectable } from '@nestjs/common';
import { MercadoRepository } from './repositories/mercado.repository';
import { CadastrarMercadoControllerDto } from './dto/controller/cadastrar-mercado.controller.dto';
import { CadastrarMercadoRepositoryDto } from './dto/repository/cadastrar-mercado.repository.dto';
import { EditarMercadoControllerDto } from './dto/controller/editar-mercado.controller.dto';

@Injectable()
export class MercadoService {
  constructor(private readonly mercadoRepository: MercadoRepository) {}

  async cadastrar(usuarioId: number, dadosDto: CadastrarMercadoControllerDto) {
    const data: CadastrarMercadoRepositoryDto = { usuarioId, ...dadosDto };

    return this.mercadoRepository.cadastrar(data);
  }

  async buscarPorUsuario(usuarioId: number) {
    return this.mercadoRepository.buscarPorUsuario(usuarioId);
  }

  async buscarUm(id: number) {
    return this.mercadoRepository.buscarUm(id);
  }

  async editar(id: number, dadosDto: EditarMercadoControllerDto) {
    return this.mercadoRepository.editar(id, dadosDto);
  }
}
