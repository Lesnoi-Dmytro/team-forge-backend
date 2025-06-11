import type { Event } from 'generated/prisma';

export interface RegisterEvent extends Omit<Event, 'id'> {
  eventFields: number[];
}
