/** @type {import('next').NextConfig} */

module.exports = {
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  compiler: {
    styledComponents: true,   
  },
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
}  