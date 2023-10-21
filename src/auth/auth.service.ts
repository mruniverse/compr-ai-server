import { Users } from '@prisma/client';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwtService: JwtService) {}

  async signIn({ email, password }: SignInDto): Promise<any> {
    const user = await this.users.privateUser(email);
    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const payload = { id: user.id, email: user.email, role_id: user.role_id, license_id: user.license_id };
    return { access_token: await this.jwtService.signAsync(payload), expires_in: 86400 };
  }

  async getMe(access_token: string, include?: string[]): Promise<Users> {
    try {
      const payload: any = await this.jwtService.verifyAsync(access_token.slice(7));

      if (include?.includes('permissions')) {
        return await this.users.findUniqueWithPermissions({ id: payload.id });
      }

      return await this.users.findUnique({ id: payload.id });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
