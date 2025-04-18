import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AdicionarProdutoListaControllerDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsNotEmpty()
  quantidade: number;

  @IsString()
  @IsNotEmpty()
  unidade: string;

  @IsNumber()
  @IsOptional()
  valor?: number;

  @IsString()
  @IsOptional()
  observacao?: string;

  @IsNumber()
  @IsNotEmpty()
  tipoProdutoId: number;
}
