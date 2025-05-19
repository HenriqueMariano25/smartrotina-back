import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ParamsDto } from '../common/dto/params.dto';
import { EditarAdministradorUsuarioControllerDto } from './dto/controller/editar-administrador-usuario.controller.dto';

@ApiTags('usuário')
@UseGuards(AuthGuard('jwt'))
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('buscarTodos')
  async buscarTodos() {
    return this.usuarioService.buscarTodos();
  }

  @Put(':id/bloquear')
  async bloquear(@Param() params: ParamsDto) {
    return this.usuarioService.bloquear(params.id);
  }

  @Put(':id/desbloquear')
  async desbloquear(@Param() params: ParamsDto) {
    return this.usuarioService.desbloquear(params.id);
  }

  @Put(':id/administrador')
  async editarAdministrado(
    @Param() params: ParamsDto,
    @Body() dadosDto: EditarAdministradorUsuarioControllerDto,
  ) {
    return this.usuarioService.editarAdministrador(params.id, dadosDto);
  }
}
