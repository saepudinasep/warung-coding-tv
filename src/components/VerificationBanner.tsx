'use client';

import { useActionState } from 'react';
import { resendVerification, type ResendVerificationState } from '@/lib/actions/verification';

export default function VerificationBanner() {
  const [state, formAction, isPending] = useActionState<ResendVerificationState, FormData>(
    async () => resendVerification(),
    undefined,
  );

  return (
    <div
      className="admin-form-error"
      style={{ background: '#fdf3d8', borderColor: '#f0d98a', color: '#7a5c0e' }}
    >
      <strong>Email Anda belum diverifikasi.</strong> Paket Gratis butuh email terverifikasi sebelum
      bisa dipakai membuat undangan.
      <form action={formAction} style={{ marginTop: 10 }}>
        <button type="submit" className="btn-admin btn-admin-secondary" disabled={isPending}>
          {isPending ? 'Mengirim...' : 'Kirim Ulang Link Verifikasi'}
        </button>
      </form>
      {state && 'sentEmail' in state && (
        <p style={{ marginTop: 10, fontSize: 13 }}>
          ✓ Email verifikasi sudah dikirim. Cek inbox (atau folder spam) di email Anda.
        </p>
      )}
      {state && 'link' in state && (
        <p style={{ marginTop: 10, fontSize: 13, wordBreak: 'break-all' }}>
          Pengiriman email belum aktif di server ini, jadi link ditampilkan langsung di sini:
          <br />
          <a href={state.link} style={{ color: '#7a5c0e', fontWeight: 600 }}>
            {state.link}
          </a>
        </p>
      )}
      {state && 'error' in state && <p style={{ marginTop: 10, fontSize: 13 }}>{state.error}</p>}
    </div>
  );
}
