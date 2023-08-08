import { LoginDto } from './dto/Login.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.signIn({
      email: loginDto.email,
      pass: loginDto.password,
    });
  }
}
