import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CadastrarMoradorControllerDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsDateString()
  @IsNotEmpty()
  dataNascimento: Date;

  @IsEmail()
  @IsOptional()
  usuario?: string;
}
