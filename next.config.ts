import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://static.cloudflareinsights.com https://*.cloudflareinsights.com https://tpc.googlesyndication.com",
      "script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://partner.googleadservices.com https://static.cloudflareinsights.com https://*.cloudflareinsights.com https://tpc.googlesyndication.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https: http: https://*.google-analytics.com https://*.googlesyndication.com",
      "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googlesyndication.com https://ep1.adtrafficquality.google https://*.supabase.co",
      "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com https://*.google.com",
      "media-src 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests"
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
  },
  output: 'standalone',
  // Resource optimization for VPS builds
  typescript: {
    // Set to true if build still crashes due to memory limits during type checking
    ignoreBuildErrors: false, 
  },
  experimental: {
    optimizePackageImports: ["@prisma/client", "jose"],
    workerThreads: false,
    cpus: 1,
  },
  async headers() {
    return [
      {
        // Apply security headers to all routes except internal Next.js assets and API routes
        // This prevents redirect loops and interference with health checks
        source: "/((?!api/|_next/static/|_next/image/|favicon.ico).*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
