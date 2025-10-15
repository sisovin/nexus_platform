/** @type {import('next').NextConfig} */
const nextConfig = {
    outputFileTracingRoot: __dirname,
    allowedDevOrigins: ['localhost', '192.168.100.200']
}

module.exports = nextConfig