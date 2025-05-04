import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */

const withPWA = nextPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development', 
    register: true,
    skipWaiting: true, 
  });

const nextConfig = {};

// export default nextConfig;
export default withPWA(nextConfig);