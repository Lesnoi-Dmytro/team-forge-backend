import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FieldsService {
  constructor(private readonly prismaService: PrismaService) {}

  async get() {
    return this.prismaService.field.findMany();
  }
}
