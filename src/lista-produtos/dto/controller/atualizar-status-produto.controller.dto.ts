import { IsNotEmpty, IsNumber } from 'class-validator';

export class AtualizarStatusProdutoControllerDto{
  @IsNumber()
  @IsNotEmpty()
  statusId: number
}