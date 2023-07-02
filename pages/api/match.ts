import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../util/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data1 = await prisma.match.findFirst();

    if (!data1) {
      return res.status(404).end()
    }

    return res.status(200).json(data1);
  } catch (error) {
    console.error(error);
    return res.status(500).end()
  }
}
