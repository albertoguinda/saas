import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      plan: 'free' | 'premium';
    };
  }

  interface User {
    id: string;
    name: string;
    email: string;
    plan: 'free' | 'premium';
  }
}
