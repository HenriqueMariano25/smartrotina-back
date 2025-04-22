import {
  Body,
  Controller,
  Delete,
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
import { CadastrarTipoProdutoControllerDto } from './dto/controller/cadastrar-tipo-produto.controller.dto';
import { EditarTipoProdutoControllerDto } from './dto/controller/editar-tipo-produto.controller.dto';
import { AdicionarProdutoListaControllerDto } from './dto/controller/adicionar-produto-lista.controller.dto';
import { EditarProdutoListaControllerDto } from './dto/controller/editar-produto-lista.controller.dto';
import { EditarValorProdutoControllerDto } from './dto/controller/editar-valor-produto.controller.dto';

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

  @Post(':id/produto/adicionar')
  async adicionarProduto(
    @Req() { user: usuario }: UserRequestDto,
    @Param() params: ParamsDto,
    @Body() dadosDto: AdicionarProdutoListaControllerDto,
  ) {
    return await this.listaProdutosService.adicionarProdutoLista(
      usuario.id,
      params.id,
      dadosDto,
    );
  }

  @Put(':id/produto/:produtoId')
  async editarProdutoLista(
    @Param() params: ParamsDto,
    @Body() dadosDto: EditarProdutoListaControllerDto,
    @Req() { user: usuario }: UserRequestDto,
  ) {
    if (params.produtoId === undefined) {
      throw new Error('Id do produto é necessário');
    }

    return await this.listaProdutosService.editarProdutoLista(
      params.id,
      params.produtoId,
      dadosDto,
      usuario.id,
    );
  }

  @Get(':id/produtos')
  async buscarProdutosPorListaProdutos(@Param() params: ParamsDto) {
    return await this.listaProdutosService.buscarProdutosPorListaProdutos(
      params.id,
    );
  }

  @Get('/produto-lista-produtos/:id')
  async buscarUmProdutoListaProduto(@Param() params: ParamsDto) {
    return this.listaProdutosService.buscarUmProdutoListaProduto(params.id);
  }

  // @Get('/produto/:id')
  // async buscarUmProduto(@Param() params: ParamsDto) {
  //   return await this.listaProdutosService.buscarUmProduto(params.id);
  // }

  // @Put('/produto/:id')
  // async editarProduto(
  //   @Param() params: ParamsDto,
  //   @Body() dadosDto: EditarProdutoControllerDto,
  // ) {
  //   return await this.listaProdutosService.editarProduto(params.id, dadosDto);
  // }

  @Put('/produto-lista-produtos/:id/valor')
  async editarValorProduto(
    @Param() params: ParamsDto,
    @Body() dadosDto: EditarValorProdutoControllerDto,
  ) {
    return await this.listaProdutosService.editarValorProdutoListaProdutos(
      params.id,
      dadosDto.valor,
    );
  }

  @Post('tipo-produto')
  async cadastrarTipoProduto(
    @Req() { user: usuario }: UserRequestDto,
    @Body() dadosDto: CadastrarTipoProdutoControllerDto,
  ) {
    return await this.listaProdutosService.cadastrarTipoProduto(
      usuario.id,
      dadosDto,
    );
  }

  @Get('tipo-produto/usuario')
  async buscarTipoProdutoPorUsuario(@Req() { user: usuario }: UserRequestDto) {
    return await this.listaProdutosService.buscarTipoProdutoProUsuario(
      usuario.id,
    );
  }

  @Put('tipo-produto/:id')
  async editarTipoProduto(
    @Param() params: ParamsDto,
    @Body() dadosDto: EditarTipoProdutoControllerDto,
  ) {
    return await this.listaProdutosService.editarTipoProduto(
      params.id,
      dadosDto,
    );
  }

  @Delete('tipo-produto/:id')
  async deletarTipoProduto(@Param() params: ParamsDto) {
    return await this.listaProdutosService.deletarTipoProduto(params.id);
  }
}
