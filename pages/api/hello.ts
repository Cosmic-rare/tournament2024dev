// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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

  // await prisma.score.createMany({
  //   data: [
  //     { matchId: 'clibmt8ka0000io86nf4pvhqp', position: 1, score: -1, class: 1 },
  //     { matchId: 'clibmt8ka0000io86nf4pvhqp', position: 2, score: -1, class: 2 },
  //     { matchId: 'clibmt8ka0000io86nf4pvhqp', position: 3, score: -1, class: 3 },
  //     { matchId: 'clibmt8ka0000io86nf4pvhqp', position: 4, score: -1, class: 4 },
  //     { matchId: 'clibmt8ka0000io86nf4pvhqp', position: 5, score: -1, class: 5 },
  //     { matchId: 'clibmt8ka0000io86nf4pvhqp', position: 6, score: -1, class: 6 },
  //     { matchId: 'clibmt8ka0000io86nf4pvhqp', position: 9, score: -1, class: 7 },
  //   ],
  // });

  res.status(200).json({ data: await prisma.score.findMany({where: {matchId: "clibmt8ka0000io86nf4pvhqp"}}) })
}
