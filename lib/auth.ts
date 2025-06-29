// lib/auth.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";
import dbConnect from "./dbConnect";
import User from "./models/user";
import bcrypt from "bcryptjs";

// Opciones de NextAuth para credenciales (ajusta según tus necesidades)
export const authOptions: AuthOptions = {
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
        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) return null;
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar || "",
          plan: user.plan || "free"
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
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
    async session({ session, token }) {
      // Añade datos custom a la session para el frontend
      if (token) {
        session.user.id = token.id as string;
        session.user.avatar = token.avatar as string;
        session.user.plan = token.plan as string;
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
