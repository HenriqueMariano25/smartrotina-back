import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginControllerDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
