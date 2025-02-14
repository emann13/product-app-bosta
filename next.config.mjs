
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'fakestoreapi.com/img',
          port: '',
        },
      ],
    },
  };
  
  export default nextConfig;
  