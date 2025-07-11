import type {
  AuthOptions as NextAuthOptions,
  Session,
  User as NextAuthUser,
} from "next-auth";
import type { JWT } from "next-auth/jwt";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { comparePassword } from "@/lib/utils";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";

// NextAuth options igual que antes, pero compatible con App Router
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email y Contraseña",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await User.findOne({ email: credentials?.email });

        if (!user) return null;

        const valid = await comparePassword(
          credentials?.password || "",
          user.password,
        );

        if (!valid) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          plan: user.plan,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.id = user.id;
        token.plan = user.plan;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.plan = token.plan;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
};

// ¡IMPORTANTE! App Router: exporta los métodos GET y POST
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
