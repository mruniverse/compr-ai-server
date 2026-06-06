import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Headers, Patch, Post } from '@nestjs/common';
import { Public } from './auth.guard';
import { CurrentUser, JwtUser } from './current-user.decorator';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signin')
  signIn(@Body() signIn: SignInDto): Promise<{ access_token: string; expires_in: number }> {
    return this.authService.signIn({
      email: signIn.email,
      password: signIn.password,
    });
  }

  @Get('me')
  async getMe(@Headers('Authorization') access_token: string): Promise<any> {
    return this.authService.getMe(access_token);
  }

  @Patch('me')
  updateProfile(@CurrentUser() user: JwtUser, @Body() dto: UpdateProfileDto) {
    return this.authService.updateProfile(user.id, dto);
  }

  @Patch('me/password')
  changePassword(@CurrentUser() user: JwtUser, @Body() dto: ChangePasswordDto) {
    return this.authService.changePassword(user.id, dto);
  }
}
