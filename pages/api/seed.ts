// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

type Data = {
  ok: Boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    await prisma.match.create({
      data: {
        title: "aa",
        gread: 0,
        c_1: 1,
        c_2: 2,
        c_3: 3,
        c_4: 4,
        c_5: 5,
        c_6: 6,
        c_7: 7,
        p_1: { l_p: -1, h_p: -1 },
        p_2: { l_p: -1, h_p: -1 },
        p_3: { l_p: -1, h_p: -1 },
        p_4: { l_p: -1, h_p: -1 },
        p_5: { l_p: -1, h_p: -1 },
        p_6: { l_p: -1, h_p: -1 },
      },
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false });
  } finally {
    await prisma.$disconnect();
  }
}
