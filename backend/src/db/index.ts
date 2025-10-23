import { PrismaClient } from '../generated/prisma/index.ts';

export function getPrismaClient() {
    return new PrismaClient();
}
