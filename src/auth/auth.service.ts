import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwtService: JwtService) {}

  async signIn({ email, password }: SignInDto): Promise<any> {
    const user = await this.users.user({ email });
    if (!user) {
      throw new UnauthorizedException();
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, email: user.email };
    return { access_token: await this.jwtService.signAsync(payload), expires_in: 86400 };
  }

  async getMe(access_token: string): Promise<any> {
    try {
      const payload: any = await this.jwtService.verifyAsync(access_token);
      return await this.users.user({ id: payload.id });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
