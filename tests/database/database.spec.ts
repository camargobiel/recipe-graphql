import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

describe('Database', () => {
  it('Table recipes should exists', () => {
    expect(prisma.recipes).toBeTruthy()
  })
})
