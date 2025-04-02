import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ResidenciaService } from './residencia.service';
import { CadastrarResidenciaControllerDto } from './dto/controller/cadastrar-residencia.controller.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { UserRequestDto } from '../common/dto/userRequest.dto';

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
    return await this.residenciaService.buscarTodos()
  }
}
