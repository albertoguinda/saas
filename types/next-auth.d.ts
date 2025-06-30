import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      plan: 'free' | 'pro' | 'premium';
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    plan: 'free' | 'pro' | 'premium';
  }
}
