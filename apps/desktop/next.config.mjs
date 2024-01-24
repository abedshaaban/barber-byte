/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: ['@repo/helpers', '@repo/ui']
}

export default nextConfig
