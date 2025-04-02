import { IsNotEmpty, IsString } from 'class-validator';

export class CadastrarResidenciaControllerDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
}
