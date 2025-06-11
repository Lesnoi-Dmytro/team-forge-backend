import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUser, Public } from './auth.guard';
import type {
  CompleteOrginizerSignUp,
  CompletePartipantSignUp,
  CreateUserRequest,
  SignInRequest,
} from 'src/auth/dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/user')
  public async getCurrentUser(@CurrentUser('sub') id: number) {
    return this.authService.getCurrentUser(id);
  }

  @Public()
  @Post('/sign-in')
  public async signIn(@Body() credentials: SignInRequest) {
    return this.authService.signIn(credentials);
  }

  @Public()
  @Post('/sign-up')
  public async signUp(@Body() data: CreateUserRequest) {
    return this.authService.signUp(data);
  }

  @Post('/sign-up/participant')
  public async completeParticipantSignUp(
    @CurrentUser('sub') userId: number,
    @Body() data: CompletePartipantSignUp,
  ) {
    return this.authService.completeParticipantSignUp(userId, data);
  }

  @Post('/sign-up/orginizer')
  public async completeOrginizerSignUp(
    @CurrentUser('sub') userId: number,
    @Body() data: CompleteOrginizerSignUp,
  ) {
    return this.authService.completeOrginizerSignUp(userId, data);
  }
}
