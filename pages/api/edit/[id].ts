import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  data: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query 
  
  if (typeof id === 'string' && /^(1|2|3|4|5|6)$/.test(id)) {    
    res.status(200).json({ data: parseInt(id, 10) })
  } else {
    res.status(400).end()
  }

}
