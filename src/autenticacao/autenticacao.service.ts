import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CadastrarControllerDto } from './dto/controller/cadastrar.controller.dto';
import * as bcrypt from 'bcrypt';
import { LoginControllerDto } from './dto/controller/login.controller.dto';
import { sign } from 'jsonwebtoken';
import * as _ from 'lodash';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AutenticacaoService {
  constructor(private readonly usuarioService: UsuarioService) {}

  private readonly saltRounds = 10;

  async criptografarSenha(senha: string): Promise<string> {
    return bcrypt.hash(senha, this.saltRounds);
  }

  async compararSenha(senha: string, hash: string) {
    return bcrypt.compare(senha, hash);
  }

  async cadastrar(cadastrarDto: CadastrarControllerDto) {
    const usuarioEncontrado = await this.usuarioService.buscarPorEmail(
      cadastrarDto.email,
    );

    if (usuarioEncontrado) {
      throw new BadRequestException('E-mail já em uso');
    }

    const senhaCriptografada = await this.criptografarSenha(cadastrarDto.senha);

    return await this.usuarioService.cadastrar({
      ...cadastrarDto,
      senha: senhaCriptografada,
    });
  }

  async login(loginDto: LoginControllerDto) {
    const usuario = await this.usuarioService.buscarPorEmail(loginDto.email);

    if (!usuario) {
      throw new BadRequestException('Usuário ou senha incorreta');
    }

    if (usuario.bloqueadoEm) {
      throw new BadRequestException(
        'Usuário bloqueado, procure o administrador do Sistema',
      );
    }

    const senhaCorreta = await this.compararSenha(
      loginDto.senha,
      usuario.senha,
    );

    if (!senhaCorreta) {
      throw new BadRequestException('Usuário ou senha incorreta');
    }

    const token = this.gerarToken(usuario.id);

    await this.usuarioService.editarUltimoLogin(usuario.id);

    return { usuario: _.omit(usuario, ['senha']), token };
  }

  private gerarToken(id: number): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
    return sign({ id }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRATION,
    });
  }

  public retornaExtrairJwt(): (request: Request) => string {
    return this.extrairJwt;
  }

  private extrairJwt(request: Request): string {
    const cabecalho = request.headers['authorization'];
    if (!cabecalho) throw new UnauthorizedException('Token ausente');

    const [, token] = cabecalho?.split(' ');

    return token;
  }

  async validarUsuario(payload: { id: number }) {
    const usuario = await this.usuarioService.buscarUm(payload.id);

    if (!usuario) throw new UnauthorizedException('Usuário não encontrado');

    return usuario;
  }
}
