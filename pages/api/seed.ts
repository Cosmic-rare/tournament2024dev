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
    // await prisma.match.create({
    //   data: {
    //     title: "女子ドッヂボール",
    //     gread: 1,
    //     c_1: 5,
    //     c_2: 2,
    //     c_3: 6,
    //     c_4: 4,
    //     c_5: 1,
    //     c_6: 3,
    //     c_7: 7,
    //     p_1: { l_p: 5, h_p: 6 },
    //     p_2: { l_p: 6, h_p: 3 },
    //     p_3: { l_p: 6, h_p: 9 },
    //     p_4: { l_p: 10, h_p: 9 },
    //     p_5: { l_p: 5, h_p: 7 },
    //     p_6: { l_p: 4, h_p: 5 },
    //   },
    // });

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false });
  } finally {
    await prisma.$disconnect();
  }
}
