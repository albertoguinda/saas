declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      avatar?: string;
      plan: "free" | "pro" | "premium";
      trialEndsAt?: Date;
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    plan: "free" | "pro" | "premium";
    trialEndsAt?: Date;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    name?: string;
    email?: string;
    avatar?: string;
    plan?: "free" | "pro" | "premium";
    trialEndsAt?: Date;
  }
}
