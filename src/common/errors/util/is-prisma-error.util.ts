import { PrismaClienteError } from '../types/PrismaClientError';

export const isPrismaError = (e: PrismaClienteError) => {
  return (
    typeof e.code === 'string' &&
    typeof e.clientVersion === 'string' &&
    (typeof e.meta === 'undefined' || typeof e.meta === 'object')
  );
};
