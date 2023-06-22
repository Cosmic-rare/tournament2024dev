import { NextApiRequest, NextApiResponse } from 'next';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export class SignInError extends Error {
  constructor() {
    super();
    this.name = "signed-error";
  }
}

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.name) {
    throw new SignInError()
  } 

  return { ok: true };
};

export default serverAuth;
