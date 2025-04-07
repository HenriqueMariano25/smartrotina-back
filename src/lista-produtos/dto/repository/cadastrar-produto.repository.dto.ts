export class CadastrarProdutoRepositoryDto {
  nome: string;
  quantidade: number;
  unidade: string;
  observacao?: string;
  tipoProdutoId: number;
  listaProdutosId: number;
  usuarioId: number;
}
