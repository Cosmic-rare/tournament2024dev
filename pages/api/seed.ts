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
    // const gread = 3
    // await prisma.match.createMany({
    //   data: [
    //     {
    //       title: "男バド",
    //       gread: gread,
    //       c_1: 1,
    //       c_2: 2,
    //       c_3: 3,
    //       c_4: 4,
    //       c_5: 5,
    //       c_6: 6,
    //       c_7: 7,
    //       p_1: { l_p: -1, h_p: -1 },
    //       p_2: { l_p: -1, h_p: -1 },
    //       p_3: { l_p: -1, h_p: -1 },
    //       p_4: { l_p: -1, h_p: -1 },
    //       p_5: { l_p: -1, h_p: -1 },
    //       p_6: { l_p: -1, h_p: -1 },
    //     },
    //     {
    //       title: "女バド",
    //       gread: gread,
    //       c_1: 1,
    //       c_2: 2,
    //       c_3: 3,
    //       c_4: 4,
    //       c_5: 5,
    //       c_6: 6,
    //       c_7: 7,
    //       p_1: { l_p: -1, h_p: -1 },
    //       p_2: { l_p: -1, h_p: -1 },
    //       p_3: { l_p: -1, h_p: -1 },
    //       p_4: { l_p: -1, h_p: -1 },
    //       p_5: { l_p: -1, h_p: -1 },
    //       p_6: { l_p: -1, h_p: -1 },
    //     },
    //     {
    //       title: "eスポーツ",
    //       gread: gread,
    //       c_1: 1,
    //       c_2: 2,
    //       c_3: 3,
    //       c_4: 4,
    //       c_5: 5,
    //       c_6: 6,
    //       c_7: 7,
    //       p_1: { l_p: -1, h_p: -1 },
    //       p_2: { l_p: -1, h_p: -1 },
    //       p_3: { l_p: -1, h_p: -1 },
    //       p_4: { l_p: -1, h_p: -1 },
    //       p_5: { l_p: -1, h_p: -1 },
    //       p_6: { l_p: -1, h_p: -1 },
    //     },
    //     {
    //       title: "男バレー",
    //       gread: gread,
    //       c_1: 1,
    //       c_2: 2,
    //       c_3: 3,
    //       c_4: 4,
    //       c_5: 5,
    //       c_6: 6,
    //       c_7: 7,
    //       p_1: { l_p: -1, h_p: -1 },
    //       p_2: { l_p: -1, h_p: -1 },
    //       p_3: { l_p: -1, h_p: -1 },
    //       p_4: { l_p: -1, h_p: -1 },
    //       p_5: { l_p: -1, h_p: -1 },
    //       p_6: { l_p: -1, h_p: -1 },
    //     },
    //     {
    //       title: "女バレー",
    //       gread: gread,
    //       c_1: 1,
    //       c_2: 2,
    //       c_3: 3,
    //       c_4: 4,
    //       c_5: 5,
    //       c_6: 6,
    //       c_7: 7,
    //       p_1: { l_p: -1, h_p: -1 },
    //       p_2: { l_p: -1, h_p: -1 },
    //       p_3: { l_p: -1, h_p: -1 },
    //       p_4: { l_p: -1, h_p: -1 },
    //       p_5: { l_p: -1, h_p: -1 },
    //       p_6: { l_p: -1, h_p: -1 },
    //     },
    //     {
    //       title: "女ドッヂボール",
    //       gread: gread,
    //       c_1: 1,
    //       c_2: 2,
    //       c_3: 3,
    //       c_4: 4,
    //       c_5: 5,
    //       c_6: 6,
    //       c_7: 7,
    //       p_1: { l_p: -1, h_p: -1 },
    //       p_2: { l_p: -1, h_p: -1 },
    //       p_3: { l_p: -1, h_p: -1 },
    //       p_4: { l_p: -1, h_p: -1 },
    //       p_5: { l_p: -1, h_p: -1 },
    //       p_6: { l_p: -1, h_p: -1 },
    //     },
    //     {
    //       title: "男サッカー",
    //       gread: gread,
    //       c_1: 1,
    //       c_2: 2,
    //       c_3: 3,
    //       c_4: 4,
    //       c_5: 5,
    //       c_6: 6,
    //       c_7: 7,
    //       p_1: { l_p: -1, h_p: -1 },
    //       p_2: { l_p: -1, h_p: -1 },
    //       p_3: { l_p: -1, h_p: -1 },
    //       p_4: { l_p: -1, h_p: -1 },
    //       p_5: { l_p: -1, h_p: -1 },
    //       p_6: { l_p: -1, h_p: -1 },
    //     }
    //   ]
    // });

    const data1 = await prisma.match.findMany({where: {gread: 1},select: {
      id: true,
      title: true,
      gread: true,
    },});
    const data2 = await prisma.match.findMany({where: {gread: 2},select: {
      id: true,
      title: true,
      gread: true,
    },});
    const data3 = await prisma.match.findMany({where: {gread: 3},select: {
      id: true,
      title: true,
      gread: true,
    },});

    console.log(data1)
    console.log(data2)
    console.log(data3)

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false });
  } finally {
    await prisma.$disconnect();
  }
}
