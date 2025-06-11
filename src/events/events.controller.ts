import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CurrentUser, Public } from 'src/auth/auth.guard';
import type { RegisterEvent } from 'src/events/dto/register-event.dto';
import { EventsService } from 'src/events/events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Public()
  @Get()
  async get() {
    return this.eventsService.get();
  }

  @Post()
  async register(@CurrentUser('sub') id: number, @Body() data: RegisterEvent) {
    return this.eventsService.register(id, data);
  }

  @Public()
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.eventsService.getById(Number(id));
  }

  @Post(':id/participants')
  async registerParticipant(
    @CurrentUser('sub') userId: number,
    @Param('id') id: string,
  ) {
    return this.eventsService.regisregisterParticipantter(userId, Number(id));
  }

  @Get(':id/participants')
  async getEventParticipant(@Param('id') id: string) {
    return this.eventsService.getEventParticipants(Number(id));
  }
}
