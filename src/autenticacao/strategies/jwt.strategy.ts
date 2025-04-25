import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {JwtFromRequestFunction, Strategy} from 'passport-jwt';
import {AutenticacaoService} from '../autenticacao.service';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly autenticacaoService: AutenticacaoService,
              private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: autenticacaoService.retornaExtrairJwt() as JwtFromRequestFunction,
      ignoreExpiration: false,
      // secretOrKey: configService.get<string>('JWT_SECRET') as string,
      secretOrKey: process.env.JWT_SECRET || configService.get<string>('JWT_SECRET') as string,
    });

    if (!configService.get<string>('JWT_SECRET')) {
      throw new Error('JWT_SECRET is not defined');
    }
  }

  async validate(jwtPayload: any) {
    const usuario = this.autenticacaoService.validarUsuario(jwtPayload);

    return usuario;
  }
}



