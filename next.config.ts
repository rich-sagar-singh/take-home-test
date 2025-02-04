/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: "export",
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  env: {
    API_BASE_URL: "https://frontend-take-home-service.fetch.com",
  },
};

export default nextConfig;
