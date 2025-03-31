import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CadastrarControllerDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  senha: string;
}
