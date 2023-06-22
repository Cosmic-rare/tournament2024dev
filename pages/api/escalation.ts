import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "util/prisma"
import serverAuth from "@/util/serverAuth";
import { SignInError } from "@/util/serverAuth"

type Data = {
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { userId } = req.body

  let user

  try {
    const { currentUser } = await serverAuth(req, res);
    user = currentUser

    if (user.role !== "ADMIN") {
      return res.status(401).end()
    }
  } catch (error) {
    if (error instanceof SignInError) {
      return res.status(401).end()
    }
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: 'EDITOR' },
    });

    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}
