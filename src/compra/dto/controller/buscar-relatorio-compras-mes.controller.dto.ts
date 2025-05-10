import { IsOptional, IsString } from 'class-validator';

export class BuscarRelatorioComprasMesControllerDto {
  @IsOptional()
  @IsString()
  mesAno: string;
}
