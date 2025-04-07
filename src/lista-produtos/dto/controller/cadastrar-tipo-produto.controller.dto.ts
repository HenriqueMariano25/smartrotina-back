import { IsNotEmpty, IsString } from 'class-validator';

export class CadastrarTipoProdutoControllerDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;
}
