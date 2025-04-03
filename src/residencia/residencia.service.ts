import { BadRequestException, Injectable } from '@nestjs/common';
import { CadastrarResidenciaControllerDto } from './dto/controller/cadastrar-residencia.controller.dto';
import { ResidenciaRepository } from './repositories/residencia.repository';
import { CadastrarMoradorRepositoryDto } from './dto/repository/cadastrar-morador.repository.dto';
import { UsuarioService } from '../usuario/usuario.service';
import { CadastrarMoradorControllerDto } from './dto/controller/cadastrar-morador.controller.dto';
import * as _ from 'lodash';
import { MoradorRepository } from './repositories/morador.repository';
import { UsuarioEntity } from '../usuario/entities/Usuario.entity';
import { EditarMoradorControllerDto } from './dto/controller/editar-morador.controller.dto';

@Injectable()
export class ResidenciaService {
  constructor(
    private readonly residenciaRepository: ResidenciaRepository,
    private readonly usuarioService: UsuarioService,
    private readonly moradorRepository: MoradorRepository,
  ) {}

  async cadastrar(
    usuarioId: number,
    dadosDto: CadastrarResidenciaControllerDto,
  ) {
    const residenciaEncontrada =
      await this.residenciaRepository.buscarPorNomeUsuario(
        usuarioId,
        dadosDto.nome,
      );

    if (residenciaEncontrada) {
      throw new BadRequestException(
        'Já existe uma residência cadastrada com esse nome',
      );
    }

    return await this.residenciaRepository.cadastrar({
      usuarioId,
      ...dadosDto,
    });
  }

  async buscarTodos() {
    return await this.residenciaRepository.buscarTodos();
  }

  async cadastrarMorador(
    residenciaId: number,
    dadosDto: CadastrarMoradorControllerDto,
  ) {
    let usuario: UsuarioEntity | null = null;

    if (dadosDto.usuario) {
      usuario = await this.usuarioService.buscarPorEmail(dadosDto.usuario);
      if (!usuario) {
        throw new BadRequestException('Usuário não encontrado');
      }
    }

    const dadosPrCadastro: CadastrarMoradorRepositoryDto = {
      ..._.omit(dadosDto, 'usuario'),
      ...(usuario && { usuarioId: usuario.id }),
      residenciaId,
    };

    return await this.moradorRepository.cadastrar(dadosPrCadastro);
  }

  async buscarMoradorPorResidencia(residenciaId: number) {
    return await this.moradorRepository.buscarMoradorPorResidencia(
      residenciaId,
    );
  }

  async editarMorador(moradorId: number, dadosDto: EditarMoradorControllerDto) {
    return await this.moradorRepository.editar(moradorId, dadosDto);
  }

  async deletarMorador(moradorId: number){
    return await this.moradorRepository.deletar(moradorId);
  }
}
