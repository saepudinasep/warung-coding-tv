'use client';

import { useState } from 'react';

export default function CopyLinkButton({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API bisa gagal di browser lama/tanpa HTTPS — abaikan saja.
    }
  }

  return (
    <button type="button" className="copy-link-btn" onClick={handleCopy}>
      {copied ? 'Tersalin!' : 'Copy Link'}
    </button>
  );
}
