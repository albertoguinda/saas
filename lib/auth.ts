// lib/auth.ts
import type { Session, User as NextAuthUser } from "next-auth";
import type { JWT } from "next-auth/jwt";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import dbConnect from "./dbConnect";
import User from "./models/user";

// Opciones de NextAuth para credenciales (ajusta según tus necesidades)
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials?.email });

        if (!user) return null;
        const isValid = await bcrypt.compare(
          credentials!.password,
          user.password,
        );

        if (!isValid) return null;

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar || "",
          plan: user.plan || "free",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      // Añade datos custom al token si logea
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.avatar = user.avatar;
        token.plan = user.plan;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      // Añade datos custom a la session para el frontend
      if (token) {
        session.user.id = token.id ?? "";
        session.user.avatar = token.avatar;
        session.user.plan = token.plan as "free" | "pro" | "premium";
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth/login", // Personaliza si tienes custom login
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
