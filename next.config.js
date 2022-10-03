/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   swcMinify: true,
   async redirects() {
      return [
         {
            source: '/',
            destination: '/tasjeel',
            permanent: false,
         },
      ]
   },
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            pathname: '**',
         },
      ],
   },
}

module.exports = nextConfig
