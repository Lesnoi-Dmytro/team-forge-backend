import type { UserType } from 'generated/prisma';

export default interface JWTUser {
  sub: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: UserType;
}

export interface CompletePartipantSignUp {
  id: number;
  country: string;
  region: string;
  city: string;
  githubUrl?: string;
  linkedInUrl?: string;
  domains: number[];
  skills: number[];
  fields: number[];
}

export interface CompleteOrginizerSignUp {
  organizationName?: string;
  organizationLink?: string;
}
