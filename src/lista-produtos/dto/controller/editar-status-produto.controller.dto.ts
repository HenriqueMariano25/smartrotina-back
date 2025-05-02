import { IsNotEmpty, IsNumber } from 'class-validator';

export class EditarStatusProdutoControllerDto {
  @IsNumber()
  @IsNotEmpty()
  statusProdutoListaId: number;
}
