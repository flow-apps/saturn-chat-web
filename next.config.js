module.exports = {
  reactStrictMode: true,
  i18n: {
    locales: ['pt-BR', 'en', 'hi', 'fr', 'es'],
    defaultLocale: 'en',
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://www.saturnchat.com.br' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS, DELETE, PATCH' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.0.108',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/saturn-chat-618e5.appspot.com/**',
      },
      {
        protocol: 'https',
        hostname: 'saturnchat.azurewebsites.net',
        pathname: '/files/**',
      },
    ],
  },
};