import { Injectable } from '@nestjs/common';
import { RotinaRepository } from './repositories/rotina.repository';
import { CadastrarRotinaControllerDto } from './dto/controller/cadastrar-rotina.controller.dto';
import { CadastrarRotinaRepositoryDto } from './dto/repository/cadastrar-rotina.repository.dto';
import { EditarRotinaRepositoryDto } from './dto/repository/editar-rotina.repository.dto';

@Injectable()
export class RotinaService {
  constructor(private readonly rotinaRepository: RotinaRepository) {}

  async cadastrar(usuarioId: number, dadosDto: CadastrarRotinaControllerDto) {
    const dadosPrCadastrar: CadastrarRotinaRepositoryDto = {
      ...dadosDto,
      usuarioId,
    };

    return await this.rotinaRepository.cadastrar(dadosPrCadastrar);
  }

  async buscarPorUsuario(usuarioId: number) {
    return await this.rotinaRepository.buscarPorUsuario(usuarioId);
  }

  async buscarUm(id: number) {
    return await this.rotinaRepository.buscarUm(id);
  }

  async editar(id: number, dadosDto: EditarRotinaRepositoryDto){
    return await this.rotinaRepository.editar(id, dadosDto);
  }
}
