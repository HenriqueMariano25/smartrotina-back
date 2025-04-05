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
import { CadastrarListaProdutosControllerDto } from './dto/controller/cadastrar-lista-produtos.controller.dto';
import { UserRequestDto } from '../common/dto/userRequest.dto';
import { ListaProdutosService } from './lista-produtos.service';
import { ParamsDto } from '../common/dto/params.dto';
import { EditarListaProdutosControllerDto } from './dto/controller/editar-lista-produtos.controller.dto';

@ApiTags('lista-produtos')
@UseGuards(AuthGuard('jwt'))
@Controller('lista-produtos')
export class ListaProdutosController {
  constructor(private readonly listaProdutosService: ListaProdutosService) {}

  @Post()
  async cadastrar(
    @Req() { user: usuario }: UserRequestDto,
    @Body() dadosDto: CadastrarListaProdutosControllerDto,
  ) {
    return await this.listaProdutosService.cadastrar(usuario.id, dadosDto);
  }

  @Get('usuario')
  async buscarPorUsuario(@Req() { user: usuario }: UserRequestDto) {
    return await this.listaProdutosService.buscarPorUsuario(usuario.id);
  }

  @Get(':id')
  async buscarUm(@Param() params: ParamsDto) {
    return await this.listaProdutosService.buscarUm(params.id);
  }

  @Put(':id')
  async editar(
    @Param() params: ParamsDto,
    @Body() dadosDto: EditarListaProdutosControllerDto,
  ) {
    return await this.listaProdutosService.editar(params.id, dadosDto);
  }
}
