'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
  return (
    <button className="admin-signout" onClick={() => signOut({ callbackUrl: '/' })}>
      Keluar
    </button>
  );
}
