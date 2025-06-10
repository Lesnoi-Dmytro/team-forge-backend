import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { User } from 'generated/prisma';
import bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import type { SignInRequest } from 'src/auth/dto/sign-in.dto';
import type { AuthResponse } from 'src/auth/dto/auth.dto';
import type {
  CompleteOrginizerSignIn,
  CompletePartipantSignIn,
  CreateUserRequest,
} from 'src/auth/dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async signin(creadentials: SignInRequest): Promise<AuthResponse> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: creadentials.email,
      },
    });

    if (
      !user ||
      !(await bcrypt.compare(creadentials.password, user.password))
    ) {
      throw new ForbiddenException('Invalid Credentials');
    }

    return this.generateAuthResponse(user);
  }

  public async signUp(data: CreateUserRequest): Promise<AuthResponse> {
    const salt = await bcrypt.genSalt();
    data.password = await bcrypt.hash(data.password, salt);

    const user = await this.prisma.user.create({
      data,
    });

    return this.generateAuthResponse(user);
  }

  public async completeParticipantSignUp(
    userId: number,
    data: CompletePartipantSignIn,
  ): Promise<User> {
    const { domains, skills, fields, ...participant } = data;

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        participant: {
          create: data,
        },
      },
    });

    return user;
  }

  public async completeOrginizerSignUp(
    userId: number,
    data: CompleteOrginizerSignIn,
  ): Promise<User> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        organizer: {
          create: data,
        },
      },
    });

    return user;
  }

  private async generateAuthResponse(user: User): Promise<AuthResponse> {
    return {
      id: String(user.id),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token: await this.generateToken(user),
    };
  }

  private async generateToken(user: User) {
    return this.jwtService.signAsync({
      sub: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  }
}
