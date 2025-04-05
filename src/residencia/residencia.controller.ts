import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Param,
  Put, Delete,
} from '@nestjs/common';
import { ResidenciaService } from './residencia.service';
import { CadastrarResidenciaControllerDto } from './dto/controller/cadastrar-residencia.controller.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserRequestDto } from '../common/dto/userRequest.dto';
import { ParamsDto } from '../common/dto/params.dto';
import { CadastrarMoradorControllerDto } from './dto/controller/cadastrar-morador.controller.dto';
import { EditarMoradorControllerDto } from './dto/controller/editar-morador.controller.dto';

@ApiTags('residência')
@UseGuards(AuthGuard('jwt'))
@Controller('residencia')
export class ResidenciaController {
  constructor(private readonly residenciaService: ResidenciaService) {}

  @Post()
  async cadastrar(
    @Req() { user: usuario }: UserRequestDto,
    @Body() dadosDto: CadastrarResidenciaControllerDto,
  ) {
    return await this.residenciaService.cadastrar(usuario.id, dadosDto);
  }

  @Get()
  async buscarTodos() {
    return await this.residenciaService.buscarTodos();
  }

  @Post(':id/morador')
  async cadastrarMorador(
    @Param() params: ParamsDto,
    @Body() dadosDto: CadastrarMoradorControllerDto,
  ) {
    return await this.residenciaService.cadastrarMorador(params.id, dadosDto);
  }

  @Get(':id/moradores')
  async buscarMoradores(@Param() params: ParamsDto) {
    return await this.residenciaService.buscarMoradorPorResidencia(params.id);
  }

  @Put('morador/:id')
  async editarMorador(
    @Param() params: ParamsDto,
    @Body() dadosDto: EditarMoradorControllerDto,
  ) {
    return await this.residenciaService.editarMorador(params.id, dadosDto);
  }

  @Delete('morador/:id')
  async deletarMorador(@Param() params: ParamsDto) {
    return await this.residenciaService.deletarMorador(params.id);
  }

  @Get('usuario/:id')
  async buscarPorUsuario(@Param() params: ParamsDto) {
    return await this.residenciaService.buscarPorUsuario(params.id);
  }

  @Get(':id/responsaveis')
  async buscarPorResponsaveis(@Param() params: ParamsDto) {
    return await this.residenciaService.buscarPorResponsaveis(params.id);
  }
}
