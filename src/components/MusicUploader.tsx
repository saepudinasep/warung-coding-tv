'use client';

import { useRef, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { setMusic, removeMusic } from '@/lib/actions/music';

export default function MusicUploader({
  invitationId,
  initialUrl,
}: {
  invitationId: string;
  initialUrl?: string;
}) {
  const [url, setUrl] = useState(initialUrl ?? '');
  const [fileName, setFileName] = useState<string | null>(null);
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
        handleUploadUrl: '/api/upload-music',
        clientPayload: JSON.stringify({ invitationId }),
      });

      const result = await setMusic(invitationId, blob.url);
      setUrl(result.url);
      setFileName(file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengunggah musik.');
    }

    setUploading(false);
    if (inputRef.current) inputRef.current.value = '';
  }

  async function handleRemove() {
    const prevUrl = url;
    setUrl('');
    setFileName(null);

    try {
      await removeMusic(invitationId);
    } catch (err) {
      setUrl(prevUrl);
      setError(err instanceof Error ? err.message : 'Gagal menghapus musik.');
    }
  }

  return (
    <div>
      {error && <div className="admin-form-error">{error}</div>}

      <div className="music-uploader-box">
        <div className="music-uploader-icon">🎵</div>
        <div className="music-uploader-info">
          {url ? (
            <>
              <div className="music-uploader-name">{fileName ?? 'Musik latar aktif'}</div>
              <audio src={url} controls style={{ width: '100%', height: 32, marginTop: 6 }} />
            </>
          ) : (
            <div className="music-uploader-empty">Belum ada musik latar.</div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <label className="media-upload-label btn-admin btn-admin-secondary">
          {uploading ? 'Mengunggah...' : url ? 'Ganti Musik' : 'Upload Musik'}
          <input
            ref={inputRef}
            type="file"
            accept="audio/*"
            onChange={(e) => handleFile(e.target.files)}
            disabled={uploading}
          />
        </label>
        {url && (
          <button type="button" className="btn-admin btn-admin-secondary" onClick={handleRemove}>
            Hapus
          </button>
        )}
      </div>
      <p className="admin-form-hint">Format MP3, WAV, OGG, atau M4A. Maks. 15MB.</p>
    </div>
  );
}
