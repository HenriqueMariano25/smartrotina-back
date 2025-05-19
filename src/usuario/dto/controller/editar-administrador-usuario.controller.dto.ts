import { IsBoolean, IsNotEmpty } from 'class-validator';

export class EditarAdministradorUsuarioControllerDto {
  @IsBoolean()
  @IsNotEmpty()
  administrador: boolean;
}
