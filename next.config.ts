// next.config.ts
import type { NextConfig } from 'next';

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ntbilnvvyfpvcrqoniha.supabase.co', // BURAYI GÜNCELLEYİN
      },
    ],
  },
};

export default config;