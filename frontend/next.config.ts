import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: { inlineCss: true },
  reactCompiler: true,
  typedRoutes: true,
  cacheComponents: true,
}

export default nextConfig
