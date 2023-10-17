const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' ? '/vulcain-website/' : '/',
  basePath: process.env.NODE_ENV === 'production' ? '/vulcain-website' : '',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
