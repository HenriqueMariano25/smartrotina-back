import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EditarListaProdutosControllerDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  @IsNumber()
  residenciaId?: number;

  @IsOptional()
  @IsNumber()
  responsavelId?: number;

  @IsOptional()
  @IsString()
  observacao?: string;
}
