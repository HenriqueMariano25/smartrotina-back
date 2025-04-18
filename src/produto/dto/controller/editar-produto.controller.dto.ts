import { IsNumber, IsOptional, IsString } from 'class-validator';

export class EditarProdutoControllerDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  observacao?: string;

  @IsNumber()
  @IsOptional()
  tipoProdutoId?: number;
}
