import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export type PrismaClienteError = PrismaClientKnownRequestError & {
  meta?: { target: string };
};
