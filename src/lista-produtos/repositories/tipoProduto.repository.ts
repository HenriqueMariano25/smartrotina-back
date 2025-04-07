import { PrismaService } from '../../config/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CadastrarTipoProdutoRepositoryDto } from '../dto/repository/cadastrar-tipo-produto.repository.dto';
import { EditarTipoProdutoRepositoryDto } from '../dto/repository/editar-tipo-produto.repository.dto';

@Injectable()
export class TipoProdutoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CadastrarTipoProdutoRepositoryDto) {
    return await this.prisma.tipoProduto.create({ data });
  }

  async buscarPorUsuario(usuarioId: number) {
    return await this.prisma.tipoProduto.findMany({ where: { usuarioId } });
  }

  async editar(id: number, data: EditarTipoProdutoRepositoryDto) {
    return await this.prisma.tipoProduto.update({ where: { id }, data });
  }

  async deletar(id: number) {
    return await this.prisma.tipoProduto.delete({ where: { id } });
  }
}
