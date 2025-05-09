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
        hostname: "picsum.photos",
        protocol: "https",
      },
      {
        protocol: "https",
        hostname: "images.nextdoor.com",
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
            connect-src 'self' http://k12e205.p.ssafy.io https://maps.googleapis.com https://maps.gstatic.com;
            img-src 'self' https://*.gstatic.com https://*.googleapis.com data: blob:;
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
