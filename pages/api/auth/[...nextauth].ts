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
        // database look up
        if (
          credentials?.password === "test"
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
  secret: "test",
});