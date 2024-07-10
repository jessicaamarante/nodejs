import { PrismaClient } from "@prisma/client"

// mostra log quando faz uma query pro bd
export const prisma = new PrismaClient({
  log: ['query'],
})