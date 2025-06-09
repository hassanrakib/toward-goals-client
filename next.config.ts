import { envConfig } from "@/config/envConfig";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Proxy API requests through next.js
  // It helps not to expose the external server apis
  // Every api request will go through this
  // so, server to server connection will be established
  // no cors issue will occur (cors policy applied by the browsers not servers)
  // *** MOST IMPORTANTLY ***//
  // frontend & backend domain will be the same
  // frontend will never know about external server, it will just know the frontend server
  // as cookies response sent from external server will go through the frontend server
  // the cookies scope will be the frontend domain
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match any request starting with /api/
        destination: `${envConfig.baseApi}/:path*`, // Proxy it to the backend
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
};

export default nextConfig;
