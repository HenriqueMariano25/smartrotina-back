import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CadastrarListaProdutosRepositoryDto } from '../dto/repository/cadastrar-lista-produtos.repository.dto';
import { EditarListaProdutosRepositoryDto } from '../dto/repository/editar-lista-produtos.repository.dto';

@Injectable()
export class ListaProdutosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CadastrarListaProdutosRepositoryDto) {
    return this.prisma.listaProdutos.create({ data });
  }

  async buscarPorUsuario(usuarioId: number) {
    return this.prisma.listaProdutos.findMany({
      where: {
        OR: [{ usuarioId }, { responsavelId: usuarioId }],
      },
      include: {
        responsavel: { select: { id: true, nome: true } },
      },
      orderBy: [{ nome: 'asc' }],
    });
  }

  async buscarUm(id: number) {
    return await this.prisma.listaProdutos.findUnique({
      where: { id },
      include: {
        responsavel: { select: { id: true, nome: true } },
      },
    });
  }

  async editar(id: number, data: EditarListaProdutosRepositoryDto) {
    return await this.prisma.listaProdutos.update({ where: { id }, data });
  }
}
