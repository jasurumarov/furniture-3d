import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // Apply these headers to USDZ files
        source: '/assets/:path*.usdz',
        headers: [
          {
            key: 'Content-Type',
            value: 'model/vnd.usdz+zip',
          },
          {
            key: 'Content-Disposition',
            value: 'inline',
          },
        ],
      },
      {
        // Apply these headers to GLB files
        source: '/assets/:path*.glb',
        headers: [
          {
            key: 'Content-Type',
            value: 'model/gltf-binary',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
