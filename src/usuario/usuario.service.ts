import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './repositories/usuario.repository';
import { UsuarioEntity } from './entities/Usuario.entity';
import { CadastrarRepositoryDto } from './dto/repository/cadastrar.repository.dto';
import { EditarAdministradorUsuarioControllerDto } from './dto/controller/editar-administrador-usuario.controller.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly usuarioRepository: UsuarioRepository) {}

  async buscarPorEmail(email: string): Promise<UsuarioEntity | null> {
    return await this.usuarioRepository.buscarPorEmail(email);
  }

  async cadastrar(dadosDto: CadastrarRepositoryDto) {
    return await this.usuarioRepository.cadastrar(dadosDto);
  }

  async buscarUm(id: number) {
    return await this.usuarioRepository.buscarUm(id);
  }

  async buscarTodos() {
    return this.usuarioRepository.buscarTodos();
  }

  async editarUltimoLogin(id: number) {
    return this.usuarioRepository.editarUltimoLogin(id);
  }

  async bloquear(id: number) {
    return this.usuarioRepository.bloquear(id);
  }

  async desbloquear(id: number) {
    return this.usuarioRepository.desbloquear(id);
  }

  async editarAdministrador(
    id: number,
    dadosDto: EditarAdministradorUsuarioControllerDto,
  ) {
    return this.usuarioRepository.editarAdministrador(
      id,
      dadosDto.administrador,
    );
  }
}
