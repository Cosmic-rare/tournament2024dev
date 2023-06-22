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
  const { id, targetPosition, insertNumber } = req.body

  try {
    await serverAuth(req, res);
  } catch (error) {
    if (error instanceof SignInError) {
      return res.status(401).end()
    }
  }

  try {
    const match = await prisma.match.findUnique({
      where: { id },
      select: { c_1: true, c_2: true, c_3: true, c_4: true, c_5: true, c_6: true, c_7: true }
    })

    if (!match) {
      res.status(404).end()
      return
    }

    const numbers = [match.c_1, match.c_2, match.c_3, match.c_4, match.c_5, match.c_6, match.c_7]
    const otherPosition = numbers.indexOf(insertNumber)

    if (otherPosition === -1) {
      res.status(400).end()
      return
    }

    // 入れ替え処理
    const updatedNumbers = [...numbers]
    updatedNumbers[targetPosition - 1] = insertNumber
    updatedNumbers[otherPosition] = numbers[targetPosition - 1]

    await prisma.match.update({
      where: { id },
      data: {
        c_1: updatedNumbers[0],
        c_2: updatedNumbers[1],
        c_3: updatedNumbers[2],
        c_4: updatedNumbers[3],
        c_5: updatedNumbers[4],
        c_6: updatedNumbers[5],
        c_7: updatedNumbers[6],
      }
    })

    await res.revalidate('/')

    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}
