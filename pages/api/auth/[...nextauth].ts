import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      authorize: (credentials) => {
        if (
          credentials?.password === process.env.PASSWORD
        ) {
          return {
            id: "",
            name: "editor",
          };
        }

        // login failed
        return null;
      },
    }),
  ],
  secret: "dbe2de07f88c3a9b60a4503bb1d015a8",
});