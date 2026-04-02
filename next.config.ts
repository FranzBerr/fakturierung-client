/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    serverActions: {},   // wichtig: kein boolean mehr!
  },
};

export default nextConfig;
