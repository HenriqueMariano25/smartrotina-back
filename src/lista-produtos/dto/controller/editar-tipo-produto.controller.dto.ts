import { IsNotEmpty, IsString } from 'class-validator';

export class EditarTipoProdutoControllerDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;
}
