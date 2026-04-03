/** @type {import('next').NextConfig} */

const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "image.tmdb.org"
            },
            {
                hostname: "localhost"
            },
            ...(backendUrl ? [{
                protocol: "https",
                hostname: new URL(backendUrl).hostname, // extracts just the hostname
            }] : []),
        ]
    }
};

export default nextConfig;
