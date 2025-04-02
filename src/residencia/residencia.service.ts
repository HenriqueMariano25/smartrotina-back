import { BadRequestException, Injectable } from '@nestjs/common';
import { CadastrarResidenciaControllerDto } from './dto/controller/cadastrar-residencia.controller.dto';
import { ResidenciaRepository } from './repositories/residencia.repository';

@Injectable()
export class ResidenciaService {
  constructor(private readonly residenciaRepository: ResidenciaRepository) {}

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
}
