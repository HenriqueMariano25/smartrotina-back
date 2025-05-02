import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../config/prisma/prisma.service';

@Injectable()
export class FormaPagamentoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async buscarTodos() {
    return this.prisma.formaPagamento.findMany({
      orderBy: { descricao: 'asc' },
    });
  }
}
