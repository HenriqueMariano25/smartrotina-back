import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class ParamsDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;

  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsOptional()
  produtoId?: number;
}
