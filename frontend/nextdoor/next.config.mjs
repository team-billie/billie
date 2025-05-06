import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
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
