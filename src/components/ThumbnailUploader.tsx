'use client';

import { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';

export default function ThumbnailUploader({
  name,
  initialUrl,
}: {
  name: string;
  initialUrl?: string;
}) {
  const [url, setUrl] = useState(initialUrl ?? '');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload-template',
      });
      setUrl(blob.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengunggah gambar.');
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} required />

      {url ? (
        <div className="thumbnail-preview">
          {/* Sumber dari URL blob dinamis milik admin sendiri — img biasa cukup. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="Preview thumbnail" />
        </div>
      ) : (
        <div className="thumbnail-preview thumbnail-preview-empty">Belum ada gambar</div>
      )}

      {error && <div className="admin-form-error">{error}</div>}

      <label className="media-upload-label btn-admin btn-admin-secondary" style={{ marginTop: 10 }}>
        {uploading ? 'Mengunggah...' : url ? 'Ganti Gambar' : 'Upload Gambar'}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFile(e.target.files)}
          disabled={uploading}
        />
      </label>
      <p className="admin-form-hint">Format JPG, PNG, WEBP, atau GIF. Maks. 10MB.</p>
    </div>
  );
}
