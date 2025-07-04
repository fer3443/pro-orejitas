import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    remotePatterns: [new URL('https://placecats.com/**'), new URL('https://placedog.net/**'), new URL('https://unsplash.com/**'), { protocol: 'https', hostname:'images.unsplash.com', pathname: '/**' }]
  }
};

export default nextConfig;
