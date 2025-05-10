import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CompraService } from './compra.service';
import { UserRequestDto } from '../common/dto/userRequest.dto';
import { CadastrarCompraControllerDto } from './dto/controller/cadastrar-compra.controller.dto';
import { BuscarRelatorioComprasMesControllerDto } from './dto/controller/buscar-relatorio-compras-mes.controller.dto';

@ApiTags('compra')
@UseGuards(AuthGuard('jwt'))
@Controller('compra')
export class CompraController {
  constructor(private readonly compraService: CompraService) {}

  @Post('')
  async cadastrar(
    @Req() { user: usuario }: UserRequestDto,
    @Body() dadosDto: CadastrarCompraControllerDto,
  ) {
    return this.compraService.cadastrar(usuario.id, dadosDto);
  }

  @Get('usuario')
  async buscarPorUsuario(@Req() { user: usuario }: UserRequestDto) {
    return this.compraService.buscarPorUsuario(usuario.id);
  }

  @Get('formas-pagamento')
  async buscarTodosFormaPagamento() {
    return this.compraService.buscarTodosFormaPagamento();
  }

  @Get('relatorio/porMes')
  async buscarRelatorioComprasPorMes(
    @Req() { user: usuario }: UserRequestDto,
    @Query() dadosDto: BuscarRelatorioComprasMesControllerDto,
  ) {
    return this.compraService.buscarRelatorioComprasPorMes(
      usuario.id,
      dadosDto,
    );
  }
}
