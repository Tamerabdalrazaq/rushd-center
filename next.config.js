/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   swcMinify: true,
   async redirects() {
      return [
         {
            source: "/",
            destination: "/tasjeel",
            permanent: false,
         },
      ];
   },
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "lh3.googleusercontent.com",
            port: "0",
            pathname: "**",
         },
      ],
   },
};

module.exports = nextConfig;
