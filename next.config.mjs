/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "links.papareact.com",
            }, 
            {
                protocol: "https",
                hostname: "links.pagereact.com",
            }, 
            {
                protocol: "http",
                hostname: "image.tmdb.org",
            }, 
        ]
    }
};

export default nextConfig;
