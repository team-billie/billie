import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */

const withPWA = nextPWA({
    dest: 'public',
  });

const nextConfig = {};

// export default nextConfig;
export default withPWA(nextConfig);