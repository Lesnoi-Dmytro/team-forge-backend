import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SkillsService {
  constructor(private readonly prismaService: PrismaService) {}

  async get() {
    return this.prismaService.skill.findMany();
  }
}
