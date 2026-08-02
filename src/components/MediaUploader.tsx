'use client';

import { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { addMedia, deleteMedia } from '@/lib/actions/media';

type MediaItem = { id: string; type: 'PHOTO' | 'VIDEO'; url: string };

export default function MediaUploader({
  invitationId,
  initialMedia,
}: {
  invitationId: string;
  initialMedia: MediaItem[];
}) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);

    for (const file of Array.from(files)) {
      try {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload',
          clientPayload: JSON.stringify({ invitationId }),
        });

        const created = await addMedia(invitationId, blob.url, file.type);
        setMedia((prev) => [...prev, created]);
      } catch (err) {
        setError(err instanceof Error ? err.message : `Gagal mengunggah ${file.name}.`);
      }
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  async function handleDelete(id: string) {
    const prevMedia = media;
    setMedia((current) => current.filter((m) => m.id !== id));

    try {
      await deleteMedia(id);
    } catch (err) {
      setMedia(prevMedia);
      setError(err instanceof Error ? err.message : 'Gagal menghapus media.');
    }
  }

  return (
    <div>
      {error && <div className="admin-form-error">{error}</div>}

      {media.length === 0 ? (
        <p className="media-empty-hint">Belum ada foto atau video yang diunggah.</p>
      ) : (
        <div className="media-grid">
          {media.map((m) => (
            <div className="media-item" key={m.id}>
              {m.type === 'VIDEO' ? (
                <video src={m.url} muted playsInline />
              ) : (
                // Sumber gambar dari URL blob dinamis milik pengguna sendiri —
                // pakai <img> biasa di sini sudah cukup, tidak perlu next/image.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt="" />
              )}
              <button
                type="button"
                className="media-delete"
                onClick={() => handleDelete(m.id)}
                aria-label="Hapus"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <label className="media-upload-label btn-admin btn-admin-secondary">
        {uploading ? 'Mengunggah...' : '+ Tambah Foto/Video'}
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
          disabled={uploading}
        />
      </label>
      <p className="admin-form-hint" style={{ marginTop: 8 }}>
        Format: JPG, PNG, WEBP, GIF, MP4, MOV, WEBM. Maks. 30MB per file.
      </p>
    </div>
  );
}
