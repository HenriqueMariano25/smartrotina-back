import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CadastrarListaProdutosControllerDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsOptional()
  observacao?: string;

  @IsInt()
  @IsOptional()
  responsavelId?: number;

  @IsInt()
  @IsOptional()
  residenciaId?: number;
}
