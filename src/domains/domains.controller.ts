import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { DomainsService } from 'src/domains/domains.service';

@Controller('domains')
export class DomainsController {
  constructor(private readonly domainsService: DomainsService) {}

  @Public()
  @Get()
  async get() {
    return this.domainsService.get();
  }
}
