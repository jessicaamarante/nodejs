import { PrismaClient } from "@prisma/client"

// mostra log quando faz uma query pro banco de dados
export const prisma = new PrismaClient({
  log: ['query'],
})