/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    nextConfig,
    images: {
        remotePatterns: [{ hostname: 'spoonacular.com'}]
    }
}
