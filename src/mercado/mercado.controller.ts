import {
  Body,
  Controller,
  Get, Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { MercadoService } from './mercado.service';
import { UserRequestDto } from '../common/dto/userRequest.dto';
import { CadastrarMercadoControllerDto } from './dto/controller/cadastrar-mercado.controller.dto';
import { ParamsDto } from '../common/dto/params.dto';
import { EditarMercadoControllerDto } from './dto/controller/editar-mercado.controller.dto';

@ApiTags('mercado')
@UseGuards(AuthGuard('jwt'))
@Controller('mercado')
export class MercadoController {
  constructor(private readonly mercadoService: MercadoService) {}

  @Post('')
  async cadastrar(
    @Req() { user: usuario }: UserRequestDto,
    @Body() dadosDto: CadastrarMercadoControllerDto,
  ) {
    return await this.mercadoService.cadastrar(usuario.id, dadosDto);
  }

  @Get('usuario')
  async buscarPorUsuario(@Req() { user: usuario }: UserRequestDto) {
    return this.mercadoService.buscarPorUsuario(usuario.id);
  }

  @Get(':id')
  async buscarUm(@Param() params: ParamsDto) {
    return await this.mercadoService.buscarUm(params.id);
  }

  @Put(':id')
  async editar(
    @Param() params: ParamsDto,
    @Body() dadosDto: EditarMercadoControllerDto,
  ) {
    return await this.mercadoService.editar(params.id, dadosDto);
  }
}
