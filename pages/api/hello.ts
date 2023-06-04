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
  const data = await prisma.match.findFirst({ where: { id: 'clignzwna0000vch8i35ps7vx' } })
  res.status(200).json({ data: data })
}
