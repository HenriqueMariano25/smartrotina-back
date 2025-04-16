import { IsNotEmpty, IsNumber } from 'class-validator';

export class EditarValorProdutoControllerDto {
  @IsNumber()
  @IsNotEmpty()
  valor: number;
}
