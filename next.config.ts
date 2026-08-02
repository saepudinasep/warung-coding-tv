import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // URL thumbnail tema & foto diisi bebas oleh admin (bisa domain apa saja),
    // jadi kita izinkan semua host HTTPS supaya tetap bisa dioptimasi next/image.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
