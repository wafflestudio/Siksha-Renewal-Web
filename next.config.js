/** @type {import('next').NextConfig} */

module.exports = {
  output: "export",
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  compiler: {
    styledComponents: true,   
  }
}  