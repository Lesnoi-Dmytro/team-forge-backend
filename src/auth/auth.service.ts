import { ForbiddenException, Injectable } from '@nestjs/common';
import type { User } from 'generated/prisma';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import type { AuthResponse } from 'src/auth/dto/auth.dto';
import type {
  CompleteOrginizerSignUp,
  CompletePartipantSignUp,
  CreateUserRequest,
  SignInRequest,
} from 'src/auth/dto/auth-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async getCurrentUser(id: number): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: { id },
      include: {
        participant: true,
        organizer: true,
      },
    });
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    return user;
  }

  public async signIn(creadentials: SignInRequest): Promise<AuthResponse> {
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
    data: CompletePartipantSignUp,
  ): Promise<User> {
    const { domains, skills, fields, ...participant } = data;

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        participant: {
          create: {
            ...participant,
            userDomains: {
              create: domains.map((id) => ({ domainId: id })),
            },
            userSkills: {
              create: skills.map((id) => ({ skillId: id })),
            },
            userFields: {
              create: fields.map((id) => ({ fieldId: id })),
            },
          },
        },
      },
      include: {
        participant: true,
      },
    });

    return user;
  }

  public async completeOrginizerSignUp(
    userId: number,
    data: CompleteOrginizerSignUp,
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
      include: {
        organizer: true,
      },
    });

    return user;
  }

  private async generateAuthResponse(user: User): Promise<AuthResponse> {
    return {
      user: user,
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
