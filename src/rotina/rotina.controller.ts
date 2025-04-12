import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RotinaService } from './rotina.service';
import { UserRequestDto } from '../common/dto/userRequest.dto';
import { CadastrarRotinaControllerDto } from './dto/controller/cadastrar-rotina.controller.dto';
import { ParamsDto } from '../common/dto/params.dto';

@ApiTags('rotina')
@UseGuards(AuthGuard('jwt'))
@Controller('rotina')
export class RotinaController {
  constructor(private readonly rotinaService: RotinaService) {}

  @Post()
  async cadastrar(
    @Req() { user: usuario }: UserRequestDto,
    @Body() dadosDto: CadastrarRotinaControllerDto,
  ) {
    return await this.rotinaService.cadastrar(usuario.id, dadosDto);
  }

  @Get('usuario')
  async buscarPorUsuario(@Req() { user: usuario }: UserRequestDto) {
    return await this.rotinaService.buscarPorUsuario(usuario.id);
  }

  @Get(':id')
  async buscarUm(@Param() params: ParamsDto) {
    return await this.rotinaService.buscarUm(params.id);
  }

  @Put(':id')
  async editar(
    @Param() params: ParamsDto,
    @Body() dadosDto: CadastrarRotinaControllerDto,
  ) {
    return await this.rotinaService.editar(params.id, dadosDto);
  }
}
