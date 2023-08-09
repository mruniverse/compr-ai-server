import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signIn: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn({
      email: signIn.email,
      password: signIn.password,
    });
  }
}
