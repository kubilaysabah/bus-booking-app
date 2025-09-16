import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from './generated/client';
import { join } from 'path';

const adapter = new PrismaBetterSQLite3({
  url: `file:${join(process.cwd(), 'prisma/dev.sqlite')}`
});

export const prisma = new PrismaClient({ adapter });