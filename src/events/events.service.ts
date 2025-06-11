import { ForbiddenException, Injectable } from '@nestjs/common';
import type { RegisterEvent } from 'src/events/dto/register-event.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prismaService: PrismaService) {}

  async get() {
    return this.prismaService.event.findMany({
      include: {
        eventFields: {
          include: {
            field: true,
          },
        },
      },
    });
  }

  async register(id: number, data: RegisterEvent) {
    const { eventFields, ...event } = data;
    const eventOrginizer = await this.prismaService.eventOrganizer.findFirst({
      where: {
        userId: id,
      },
    });
    if (!eventOrginizer) {
      throw new ForbiddenException('Invalid event orginizer');
    }

    return this.prismaService.event.create({
      data: {
        ...event,
        createdBy: eventOrginizer?.id,
        eventFields: { create: eventFields.map((id) => ({ fieldId: id })) },
      },
    });
  }

  async getById(id: number) {
    return this.prismaService.event.findFirst({
      where: { id },
      include: {
        organizer: true,
        eventFields: {
          include: {
            field: true,
          },
        },
      },
    });
  }

  async regisregisterParticipantter(userId: number, eventId: number) {
    const participant = await this.prismaService.participant.findFirst({
      where: {
        userId,
      },
    });
    if (!participant) {
      throw new ForbiddenException('Participant not found');
    }

    return await this.prismaService.eventParticipant.create({
      data: {
        participantId: participant.id,
        eventId,
      },
      include: {
        participant: {
          include: {
            user: true,
            userDomains: { include: { domain: true } },
            userSkills: { include: { skill: true } },
            userFields: { include: { field: true } },
          },
        },
      },
    });
  }

  async getEventParticipants(eventId: number) {
    return await this.prismaService.eventParticipant.findMany({
      where: {
        eventId,
      },
      include: {
        participant: {
          include: {
            user: true,
            userDomains: { include: { domain: true } },
            userSkills: { include: { skill: true } },
            userFields: { include: { field: true } },
          },
        },
      },
    });
  }
}
