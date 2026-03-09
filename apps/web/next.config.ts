import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@mobinogi/shared'], // 👈 외부 패키지를 트랜스파일하도록 명시
  async redirects() {
    return [
      {
        source: '/',
        destination: '/rank',
        permanent: true,
      }
    ];
  },
};

export default nextConfig;
