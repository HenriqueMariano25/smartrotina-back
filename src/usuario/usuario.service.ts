import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from './repositories/usuario.repository';
import { UsuarioEntity } from './entities/Usuario.entity';
import { CadastrarRepositoryDto } from './dto/repository/cadastrar.repository.dto';

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
}
