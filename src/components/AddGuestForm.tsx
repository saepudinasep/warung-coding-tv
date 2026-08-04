'use client';

import { useActionState } from 'react';
import { addGuest, type GuestActionState } from '@/lib/actions/guests';

export default function AddGuestForm({ invitationId }: { invitationId: string }) {
  const boundAction = addGuest.bind(null, invitationId);
  const [state, formAction, isPending] = useActionState<GuestActionState, FormData>(
    boundAction,
    undefined,
  );

  return (
    <div>
      {state?.error && <div className="admin-form-error">{state.error}</div>}
      <form action={formAction} className="guest-add-form">
        <div className="admin-form-field">
          <label htmlFor="guest-name">Nama Tamu</label>
          <input id="guest-name" name="name" type="text" required />
        </div>
        <div className="admin-form-field">
          <label htmlFor="guest-phone">No. WhatsApp</label>
          <input id="guest-phone" name="phone" type="tel" placeholder="08xxxxxxxxxx" required />
        </div>
        <div className="admin-form-field">
          <label htmlFor="guest-count">Jumlah</label>
          <input id="guest-count" name="guestCount" type="number" min={1} defaultValue={1} />
        </div>
        <button type="submit" className="btn-admin btn-admin-primary" disabled={isPending}>
          {isPending ? 'Menyimpan...' : '+ Tambah'}
        </button>
      </form>
    </div>
  );
}
