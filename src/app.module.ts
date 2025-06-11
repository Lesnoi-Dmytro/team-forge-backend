import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { SkillsModule } from './skills/skills.module';
import { DomainsModule } from './domains/domains.module';
import { FieldsModule } from './fields/fields.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    SkillsModule,
    DomainsModule,
    FieldsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
