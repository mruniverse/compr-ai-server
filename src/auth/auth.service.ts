import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LicencasService } from 'src/licencas/licencas.service';

@Injectable()
export class AuthService {
  constructor(
    private users: UsersService,
    private licencas: LicencasService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: SignInDto): Promise<any> {
    const user = await this.users.user({ email });
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, email: user.email };
    return { access_token: await this.jwtService.signAsync(payload), user };
  }

  async signUp({
    pessoaData,
    licencaData,
    name,
    email,
    password,
  }: SignUpDto): Promise<any> {
    const licenca = await this.licencas.create(licencaData);
    const user = await this.users.createUser({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      active: true,
      licenca: { connect: { id: licenca.id } },
    });

    const payload = { id: user.id, email: user.email };
    return { access_token: await this.jwtService.signAsync(payload), user };
  }
}
