import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@mobinogi/shared'], // 👈 외부 패키지를 트랜스파일하도록 명시
};

export default nextConfig;
