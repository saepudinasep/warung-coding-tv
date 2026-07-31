import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      userType: 'admin' | 'customer';
      role?: 'ADMIN' | 'STAFF';
    } & DefaultSession['user'];
  }

  interface User {
    userType: 'admin' | 'customer';
    role?: 'ADMIN' | 'STAFF';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userType?: 'admin' | 'customer';
    role?: 'ADMIN' | 'STAFF';
  }
}
