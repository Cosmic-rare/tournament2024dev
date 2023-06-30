import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/util/prisma';

type Data = {
  data1?: Array<any>
  data2?: Array<any>
  data3?: Array<any>
  ok?: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const data1 = await prisma.match.findMany({where: {gread: 1},select: {
      id: true,
      title: true,
      gread: true,
      sex: true
    },});
    const data2 = await prisma.match.findMany({where: {gread: 2},select: {
      id: true,
      title: true,
      gread: true,
      sex: true
    },});
    const data3 = await prisma.match.findMany({where: {gread: 3},select: {
      id: true,
      title: true,
      gread: true,
      sex: true
    },});

    res.status(200).json({ data1: data1, data2: data2, data3: data3 });
  } catch (error) {
    res.status(500).json({ ok: false });
  }
}
