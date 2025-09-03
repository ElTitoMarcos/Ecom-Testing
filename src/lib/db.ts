import { PrismaClient, type Prisma } from '@prisma/client'
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const logOptions: Prisma.LogLevel[] =
  process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : []

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: logOptions
  })

if (process.env.NODE_ENV !== 'production') (globalForPrisma as any).prisma = prisma
