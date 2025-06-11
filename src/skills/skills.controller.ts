import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { SkillsService } from 'src/skills/skills.service';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Public()
  @Get()
  async get() {
    return this.skillsService.get();
  }
}
