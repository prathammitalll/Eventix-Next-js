/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['tsx', 'ts'],
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack: (config) => {
    config.resolve.extensions = ['.tsx', '.ts', '.js']
    return config
  }
};

export default nextConfig;
