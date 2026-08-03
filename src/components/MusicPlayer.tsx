'use client';

import { useRef, useState } from 'react';

export default function MusicPlayer({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;

    if (muted) {
      audio.muted = false;
      audio.play().catch(() => {
        // Kalau browser tetap block autoplay meski sudah interaksi user,
        // biarkan saja — tombol tetap bisa dicoba lagi.
      });
      setMuted(false);
    } else {
      audio.muted = true;
      setMuted(true);
    }
  }

  return (
    <>
      {/* Autoplay wajib muted dulu — kebijakan browser modern (Chrome, Safari,
          dst) memblokir autoplay bersuara tanpa interaksi user. Tombol di
          bawah ini yang mengizinkan pengunjung menyalakan suaranya sendiri. */}
      <audio ref={audioRef} src={url} loop autoPlay muted playsInline />
      <button
        type="button"
        className="invite-mute-btn"
        onClick={toggleMute}
        aria-label={muted ? 'Nyalakan musik' : 'Matikan musik'}
      >
        {muted ? '🔇' : '🔊'}
      </button>
    </>
  );
}
