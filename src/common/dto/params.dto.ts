import { Transform } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ParamsDto {
  @IsNumber()
  @Transform(({ value }) => Number(value))
  id: number;
}
