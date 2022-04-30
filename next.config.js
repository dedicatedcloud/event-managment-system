const withTM = require('next-transpile-modules')(['prisma']); // pass the modules you would like to see transpiled
const path = require('path');

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
});
/*module.exports = {
  reactStrictMode: true,
}*/
/*
// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
};*/
