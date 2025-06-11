import { Controller, Get } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { FieldsService } from 'src/fields/fields.service';

@Controller('fields')
export class FieldsController {
  constructor(private readonly fieldsService: FieldsService) {}

  @Public()
  @Get()
  async get() {
    return this.fieldsService.get();
  }
}
