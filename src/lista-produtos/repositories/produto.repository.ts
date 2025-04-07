import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';
import { CadastrarProdutoRepositoryDto } from '../dto/repository/cadastrar-produto.repository.dto';

@Injectable()
export class ProdutoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async cadastrar(data: CadastrarProdutoRepositoryDto) {
    return await this.prisma.produto.create({ data });
  }
}
