import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

type Data = {
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('loaded')
  const data = await prisma.match.findFirst({ where: { id: 'clignzwna0000vch8i35ps7vx' } })
  console.log('readed')
  res.status(200).json({ data: data })
}
