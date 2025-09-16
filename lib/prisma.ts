import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from './generated/client';
 
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const adapter = new PrismaBetterSQLite3({
  url: `file:../prisma/dev.sqlite`
});
 
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })
 
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

