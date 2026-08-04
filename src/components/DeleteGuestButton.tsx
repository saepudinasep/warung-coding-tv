'use client';

import { useTransition } from 'react';
import { deleteGuest } from '@/lib/actions/guests';

export default function DeleteGuestButton({ guestId }: { guestId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      className="guest-delete-btn"
      disabled={isPending}
      onClick={() => {
        if (confirm('Hapus tamu ini?')) {
          startTransition(() => {
            deleteGuest(guestId);
          });
        }
      }}
    >
      {isPending ? '...' : 'Hapus'}
    </button>
  );
}
