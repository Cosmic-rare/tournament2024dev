import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/util/prisma';
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

  if (!session?.user?.email) {
    throw new SignInError()
  } 

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    }
  });

  if (!currentUser) {
    throw new SignInError()
  }

  return { currentUser };
};

export default serverAuth;
