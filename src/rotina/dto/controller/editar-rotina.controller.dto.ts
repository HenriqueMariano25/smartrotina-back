import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class EditarRotinaControllerDto {
  @IsString()
  @IsOptional()
  nome?: string;

  @IsString()
  @IsOptional()
  dataInicio?: string;

  @IsString()
  @IsOptional()
  dataTermino?: string;

  @IsString()
  @IsOptional()
  horaInicio?: string;

  @IsString()
  @IsOptional()
  horaTermino?: string;

  @IsString()
  @IsOptional()
  repeticao?: string;

  @IsInt()
  @IsOptional()
  intervalo?: number;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  periodo?: string[];

  @IsOptional()
  @IsInt()
  responsavelId?: number;

  @IsOptional()
  @IsInt()
  residenciaId?: number;

  @IsOptional()
  @IsString()
  observacao?: string;
}
