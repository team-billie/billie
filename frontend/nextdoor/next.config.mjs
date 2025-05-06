import nextPWA from "next-pwa";

const withPWA = nextPWA({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development', 
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
    ],
  },
};

// export default nextConfig;
export default withPWA(nextConfig);
