'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type ImportResult = { success: number; skipped: number; total: number } | null;

export default function GuestImportBox({ invitationId }: { invitationId: string }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<ImportResult>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;

    setError(null);
    setResult(null);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('invitationId', invitationId);
      formData.append('file', file);

      const res = await fetch('/api/guests/import', { method: 'POST', body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Import gagal.');
      } else {
        setResult(data);
        router.refresh();
      }
    } catch {
      setError('Import gagal. Coba lagi.');
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div>
      {error && <div className="admin-form-error">{error}</div>}
      {result && (
        <div className={`guest-import-result ${result.skipped > 0 ? 'warn' : 'ok'}`}>
          Berhasil impor {result.success} dari {result.total} baris.
          {result.skipped > 0 && ` ${result.skipped} baris dilewati (nama/nomor tidak valid).`}
        </div>
      )}

      <div className="guest-import-box">
        <p>
          Import dari file Excel (.xlsx) atau CSV. Kolom yang dibaca: <strong>Nama</strong> dan{' '}
          <strong>No HP/WhatsApp</strong> (kolom Jumlah opsional).
        </p>
        <label className="media-upload-label btn-admin btn-admin-secondary">
          {uploading ? 'Mengimpor...' : 'Import File'}
          <input
            ref={inputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => handleFile(e.target.files)}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}
