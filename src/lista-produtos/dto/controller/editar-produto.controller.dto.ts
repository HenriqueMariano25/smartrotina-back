import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditarProdutoControllerDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsNumber()
  @IsOptional()
  quantidade?: number;

  @IsString()
  @IsOptional()
  unidade?: string;

  @IsString()
  @IsOptional()
  observacao?: string;

  @IsNumber()
  @IsOptional()
  tipoProdutoId?: number;

  @IsNumber()
  @IsOptional()
  valor?: number;
}
