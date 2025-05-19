import { PrismaService } from '../../config/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CadastrarRepositoryDto } from '../dto/repository/cadastrar.repository.dto';
import { UsuarioEntity } from '../entities/Usuario.entity';

@Injectable()
export class UsuarioRepository {
  constructor(private readonly prisma: PrismaService) {}

  async buscarPorEmail(email: string): Promise<UsuarioEntity | null> {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  async cadastrar(data: CadastrarRepositoryDto): Promise<UsuarioEntity> {
    return this.prisma.usuario.create({ data });
  }

  async buscarUm(id: number) {
    return this.prisma.usuario.findUnique({ where: { id } });
  }

  async buscarTodos() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        criadoEm: true,
        editadoEm: true,
        ultimoLogin: true,
        bloqueadoEm: true,
        administrador: true,
      },
    });
  }

  async editarUltimoLogin(id: number) {
    return this.prisma.usuario.update({
      where: { id },
      data: {
        ultimoLogin: new Date(),
      },
    });
  }

  async bloquear(id: number) {
    return this.prisma.usuario.update({
      where: { id },
      data: {
        bloqueadoEm: new Date(),
      },
    });
  }

  async desbloquear(id: number) {
    return this.prisma.usuario.update({
      where: { id },
      data: {
        bloqueadoEm: null,
      },
    });
  }

  async editarAdministrador(id: number, administrador: boolean) {
    return this.prisma.usuario.update({
      where: { id },
      data: {
        administrador,
      },
    });
  }
}
