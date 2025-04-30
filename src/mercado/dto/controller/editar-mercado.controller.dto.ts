import { IsOptional, IsString } from 'class-validator';

export class EditarMercadoControllerDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  observacao?: string;
}
