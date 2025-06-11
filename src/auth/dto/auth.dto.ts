import type { User } from 'generated/prisma';

export interface AuthResponse {
  user: User;
  token: string;
}
