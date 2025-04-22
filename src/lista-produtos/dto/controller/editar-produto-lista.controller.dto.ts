import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditarProdutoListaControllerDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  observacao: string;

  @IsNumber()
  @IsOptional()
  tipoProdutoId: number;

  @IsNumber()
  @IsNotEmpty()
  produtoListaProdutoId: number;

  @IsNumber()
  @IsOptional()
  quantidade?: number;

  @IsString()
  @IsOptional()
  unidade?: string;

  @IsNumber()
  @IsOptional()
  valor?: number;
}
