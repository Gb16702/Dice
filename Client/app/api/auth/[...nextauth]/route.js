import NextAuth from "next-auth"
import User from "../../../../../Server/Core/database/schemas/User"


export default NextAuth({
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user?._id) token._id = user._id;
        if (user?.createdAt) token.createdAt = user.createdAt;
        if (user?.isAdmin) token.isAdmin = user.isAdmin;
        if (user?.image) token.image = user.image;
        return token;
      },
      async session({ session, token }) {
        if (token?._id) session.user._id = token._id;
        if (token?.createdAt) session.user.createdAt = token.createdAt;
        if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
        if (token?.image) session.user.image = token.image;
        return session;
      },
    },

    providers: [
      CredentialsProvider({
        async authorize(credentials) {
            const res = await fetch('http://localhost:8000/user')
            const user = await res.json()
            console.log(user);

          throw new Error("E-mail ou mot de passe invalide");
        },
      }),
    ],
  });