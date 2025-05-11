import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.nextdoor.com",
      },
      {
        protocol: "https",
        hostname: "nextdoor-images.com",
      },
      {
        protocol: "https",
        hostname: "oneders.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com", // ✅ 추가
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              `
            default-src 'self';
            script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com;
            connect-src 'self' http://k12e205.p.ssafy.io http://k12e205.p.ssafy.io:8081 https://maps.googleapis.com https://maps.gstatic.com;
            img-src 'self' https://*.gstatic.com https://*.googleapis.com data: blob:
              https://nextdoor-images.com
              https://oneders.s3.ap-northeast-2.amazonaws.com
              https://ssafy-nextdoor.s3.ap-northeast-2.amazonaws.com;
            style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
            font-src 'self' https://fonts.gstatic.com;
          `
                .replace(/\s{2,}/g, " ")
                .trim() + ";",
          },
        ],
      },
    ];
  },
};

export default withPWA(nextConfig);
