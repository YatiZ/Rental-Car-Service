/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'http',
                hostname:'localhost',
                port:'8000',
                pathname:'/**'
            }
        ],
        domains:['w7.pngwing.com'],
    }
};

export default nextConfig;
