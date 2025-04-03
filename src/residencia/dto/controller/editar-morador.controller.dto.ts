import { IsDateString, IsOptional, IsString } from 'class-validator';

export class EditarMoradorControllerDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsDateString()
  @IsOptional()
  dataNascimento?: Date;
}
