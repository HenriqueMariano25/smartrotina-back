import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy} from 'passport-jwt';
import {AutenticacaoService} from '../autenticacao.service';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly autenticacaoService: AutenticacaoService,
              private readonly configService: ConfigService
  ) {
    const jwtSecret = configService.get<string>('JWT_SECRET') || 'teste'

    super({
      jwtFromRequest: autenticacaoService.retornaExtrairJwt(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    })

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }
  }

  async validate(jwtPayload: any) {
    const usuario = this.autenticacaoService.validarUsuario(jwtPayload);

    return usuario;
  }
}
