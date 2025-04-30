import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CadastrarMercadoControllerDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  observacao: string;
}
