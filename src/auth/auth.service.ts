import { Users } from '@prisma/client';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
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

    const payload = { id: user.id, email: user.email };
    return { access_token: await this.jwtService.signAsync(payload), expires_in: 86400 };
  }

  async getMe(access_token: string): Promise<Users> {
    try {
      const payload: any = await this.jwtService.verifyAsync(access_token.slice(7));

      return await this.users.findUnique({ id: payload.id });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<Users> {
    if (!dto.name && !dto.email) {
      throw new BadRequestException('Nenhum dado para atualizar');
    }
    if (dto.email) {
      const existing = await this.users.findUniqueByEmail(dto.email);
      if (existing && existing.id !== userId) {
        throw new ConflictException('Email já cadastrado');
      }
    }
    await this.users.update(userId, dto);
    return this.users.findUnique({ id: userId });
  }

  async changePassword(
    userId: string,
    dto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    const user = await this.users.findByIdWithPassword(userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    const valid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!valid) {
      throw new UnauthorizedException('Senha atual incorreta');
    }
    // users.update hashes the password — pass plaintext, do not pre-hash.
    await this.users.update(userId, { password: dto.newPassword });
    return { message: 'Senha alterada com sucesso' };
  }
}
