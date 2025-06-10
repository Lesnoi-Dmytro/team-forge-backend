import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser, Public } from './auth.guard';
import type { SignInRequest } from 'src/auth/dto/sign-in.dto';
import type {
  CompleteOrginizerSignIn,
  CompletePartipantSignIn,
  CreateUserRequest,
} from 'src/auth/dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/sign-in')
  public async signin(@Body() credentials: SignInRequest) {
    return this.authService.signin(credentials);
  }

  @Public()
  @Post('/sign-up')
  public async signUp(@Body() data: CreateUserRequest) {
    return this.authService.signUp(data);
  }

  @Public()
  @Post('/sign-up/participant')
  public async completeParticipantSignUp(
    @CurrentUser('sub') userId: number,
    @Body() data: CompletePartipantSignIn,
  ) {
    return this.authService.completeParticipantSignUp(userId, data);
  }

  @Public()
  @Post('/sign-up/orginizer')
  public async completeOrginizerSignUp(
    @CurrentUser('sub') userId: number,
    @Body() data: CompleteOrginizerSignIn,
  ) {
    return this.authService.completeOrginizerSignUp(userId, data);
  }
}
