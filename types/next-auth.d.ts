declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      avatar?: string;
      plan: "free" | "pro" | "premium";
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    plan: "free" | "pro" | "premium";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    plan?: "free" | "pro" | "premium";
  }
}
