import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development', 
  register: true,
  skipWaiting: true, 
});

const nextConfig = {
  // kakao 맵 
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; connect-src 'self' https://*.kakao.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.kakao.com https://*.daumcdn.net; style-src 'self' 'unsafe-inline'; img-src 'self' https://*.kakao.com https://*.daumcdn.net data: blob:;"
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);