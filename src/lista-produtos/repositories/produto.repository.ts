// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../../config/prisma/prisma.service';
// import { CadastrarProdutoRepositoryDto } from '../../produto/dto/repository/cadastrar-produto.repository.dto';
// import { EditarProdutoRepositoryDto } from '../../produto/dto/repository/editar-produto.repository.dto';
//
// @Injectable()
// export class ProdutoRepository {
//   constructor(private readonly prisma: PrismaService) {}
//
//   async cadastrar(data: CadastrarProdutoRepositoryDto) {
//     return await this.prisma.produto.create({ data });
//   }
//
//   async buscarPorListaProdutos(listaProdutosId: number) {
//     return await this.prisma.produto.findMany({
//       where: { listaProdutosId },
//       orderBy: { nome: 'asc' },
//     });
//   }
//
//   async buscarUm(id: number) {
//     return await this.prisma.produto.findUnique({ where: { id } });
//   }
//
//   async editar(id: number, data: EditarProdutoRepositoryDto) {
//     return await this.prisma.produto.update({ where: { id }, data });
//   }
//
//   async editarValor(id: number, valor: number) {
//     return await this.prisma.produto.update({ where: { id }, data: { valor } });
//   }
// }
