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
  const { id, p, l_p, h_p, l_p2, h_p2 } = req.body

  try {
    await serverAuth(req, res);
  } catch (error) {
    if (error instanceof SignInError) {
      return res.status(401).end()
    }
  }

  // バリデーションチェック
  if (l_p < -1 || h_p < -1) {
    return res.status(400).end()
  }

  if (![1, 2, 3, 4, 5, 6].includes(p)) {
    return res.status(400).end()
  }

  try {
    if (l_p === h_p) {
      await prisma.match.update({
        where: { id },
        data: {
          [`p_${p}`]: {
            update: {
              l_p,
              h_p,
              l_p2,
              h_p2
            }
          }
        }
      })
    }

    await prisma.match.update({
      where: { id },
      data: {
        [`p_${p}`]: {
          update: {
            l_p,
            h_p
          }
        }
      }
    })
    
    await res.revalidate('/')

    res.status(200).end()
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
}
