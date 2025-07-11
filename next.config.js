/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheStartUrl: true,
  disable:
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_HOST === " http://localhost:3000",
  reloadOnOnline: true,
  mode: "production",
});

const staticExport =
  process.env.NEXT_PUBLIC_STATIC_EXPORT === "true" &&
  process.env.NEXT_PUBLIC_HOST === "http://localhost:3000";

const nextConfig = {
  output: staticExport ? "export" : "standalone",
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  // pageExtensions: ["page.tsx", "endpoint.ts"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,

  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },

  experimental: {
    serverComponentsExternalPackages: ["axios"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "false" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this with your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT,OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Referrer-policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://my-profile-page-phi.vercel.app/; style-src 'self' https://api.mapbox.com/ https://fonts.googleapis.com/ https://unpkg.com/ 'unsafe-inline'",
          },
          {
            key: "Permissions-Policy",
            value: "microphone=()",
          },
        ],
      },
    ];
  },
};

module.exports = withPWA({ ...nextConfig });
