
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable strict mode for catching potential issues
  swcMinify: true, // Enable SWC minification for faster builds and performance

  // Public environment variables that can be used both on the client and server
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_API_USERNAME: process.env.NEXT_PUBLIC_API_USERNAME,
    NEXT_PUBLIC_API_PASSWORD: process.env.NEXT_PUBLIC_API_PASSWORD,
    CACHE_EXPIRATION_TIME: process.env.CACHE_EXPIRATION_TIME,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.alphatutor.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'content.alphatutor.org',
        pathname: '/**',
      },
    ],
  },

  compress: true, // Enable gzip compression for response performance

  // Custom headers for security
  async headers() {
    return [
      {
        source: '/(.*)', // Apply to all routes
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN', // Prevent clickjacking
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Prevent MIME-type sniffing
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload', // Enforce HTTPS
          },
        ],
      },
    ];
  },
};

export default nextConfig;
