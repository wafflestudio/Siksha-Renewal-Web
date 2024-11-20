/** @type {import('next').NextConfig} */

module.exports = {
  output: process.env.NEXT_OUTPUT_MODE === "export" ? "export" : "standalone",
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  compiler: {
    styledComponents: true,   
  }
}  