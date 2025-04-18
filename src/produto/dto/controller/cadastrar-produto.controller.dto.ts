import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CadastrarProdutoControllerDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  observacao?: string;

  @IsNumber()
  @IsNotEmpty()
  tipoProdutoId: number;
}
