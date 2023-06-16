/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env : {
    CLOUD_NAME : "dsqmxpgth",
  },
  images : {
    domains : ["res.cloudinary.com"]
  }
}

module.exports = nextConfig
