import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CadastrarRotinaControllerDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  dataInicio: string;

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
