import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { CadastrarControllerDto } from './dto/controller/cadastrar.controller.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginControllerDto } from './dto/controller/login.controller.dto';
// import { AuthGuard } from '@nestjs/passport';

@ApiTags('autenticação')
@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  async login(@Body() loginDto: LoginControllerDto) {
    return await this.autenticacaoService.login(loginDto);
  }

  @Post('cadastrar')
  async cadastrar(@Body() cadastrarDto: CadastrarControllerDto) {
    return await this.autenticacaoService.cadastrar(cadastrarDto);
  }
}
