import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CadastrarProdutoControllerDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsNotEmpty()
  quantidade: number;

  @IsString()
  @IsNotEmpty()
  unidade: string;

  @IsString()
  @IsOptional()
  observacao?: string;

  @IsNumber()
  @IsNotEmpty()
  tipoProdutoId: number;

  @IsNumber()
  @IsOptional()
  valor?: number
}
