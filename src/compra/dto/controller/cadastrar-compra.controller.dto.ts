import {
  IsArray, IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CadastrarCompraControllerDto {
  @IsOptional()
  @IsString()
  observacao?: string;

  @IsNotEmpty()
  @IsNumber()
  formaPagamentoId: number;

  @IsNotEmpty()
  @IsNumber()
  mercadoId: number;

  @IsNotEmpty()
  @IsString()
  compradoEm: Date;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsArray()
  @IsNotEmpty()
  @IsInt({ each: true })
  produtosListaProdutos: number[];
}
