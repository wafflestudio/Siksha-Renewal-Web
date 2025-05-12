/** @type {import('next').NextConfig} */

module.exports = {
  output: process.env.NEXT_OUTPUT_MODE === "export" ? "export" : "standalone",
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  compiler: {
    styledComponents: true,   
  }
}  