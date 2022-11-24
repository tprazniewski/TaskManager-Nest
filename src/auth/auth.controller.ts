import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(@Body() authCredentialsCto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsCto);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsCto: AuthCredentialsDto): Promise<string> {
    return this.authService.signIn(authCredentialsCto);
  }
}
