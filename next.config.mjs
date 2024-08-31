/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
   
          {
            protocol: "http",
            hostname: "**",
          }
        ],
      },
};

export default nextConfig;
