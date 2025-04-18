import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProdutoService } from './produto.service';
import { UserRequestDto } from '../common/dto/userRequest.dto';
import { CadastrarProdutoControllerDto } from './dto/controller/cadastrar-produto.controller.dto';
import { ParamsDto } from '../common/dto/params.dto';

@ApiTags('produto')
@UseGuards(AuthGuard('jwt'))
@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  async buscarPorUsuario(@Req() { user: usuario }: UserRequestDto) {
    return this.produtoService.buscarPorUsuario(usuario.id);
  }

  @Post()
  async cadastrar(
    @Req() { user: usuario }: UserRequestDto,
    @Body() dadosDto: CadastrarProdutoControllerDto,
  ) {
    return await this.produtoService.cadastrar(usuario.id, dadosDto);
  }

  @Get(':id')
  async buscarUm(@Param() params: ParamsDto) {
    return await this.produtoService.buscarUm(params.id);
  }

  @Put(':id')
  async editar(
    @Param() params: ParamsDto,
    @Body() dadosDto: CadastrarProdutoControllerDto,
  ) {
    return await this.produtoService.editar(params.id, dadosDto);
  }

  @Delete(':id')
  async deletar(@Param() params: ParamsDto) {
    return await this.produtoService.deletar(params.id);
  }
}
