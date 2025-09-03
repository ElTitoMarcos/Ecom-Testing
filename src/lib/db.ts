import { PrismaClient, type Prisma } from '@prisma/client'
import path from 'path'

// Ensure there's always a DATABASE_URL so the app can run without extra setup
if (!process.env.DATABASE_URL) {
  const dbPath = path.join(process.cwd(), 'dev.db')
  process.env.DATABASE_URL = `file:${dbPath}`
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const logOptions: Prisma.LogLevel[] =
  process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : []

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: logOptions
  })

if (process.env.NODE_ENV !== 'production') (globalForPrisma as any).prisma = prisma
