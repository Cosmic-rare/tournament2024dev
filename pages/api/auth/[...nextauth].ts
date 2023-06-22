import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type ClientType = {
  clientId: string;
  clientSecret: string;
};

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ClientType),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      session.user.role = user.role
      return session;
    }
  },
  events: {
    createUser: async ({ user }) => {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          role: "USER",
        },
      });
    },
  },
}

export default NextAuth(authOptions);
