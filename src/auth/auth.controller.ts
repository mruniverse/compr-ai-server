import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body, Get, Headers } from '@nestjs/common';

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

  @Get('me')
  async getMe(@Headers('Authorization') access_token: string): Promise<any> {
    access_token = access_token.slice(7);
    return await this.authService.getMe(access_token);
  }
}
