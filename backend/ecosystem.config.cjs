module.exports = {
  apps: [
    {
      name: 'melting-backend',
      script: './server.js',
      env: {
        NODE_ENV: 'development',
        CLIENT_URL: 'http://localhost:5173',
        SERVER_URL: 'http://localhost:3001',
      },
      env_production: {
        NODE_ENV: 'production',
        CLIENT_URL: 'https://meltingpointproductions.com',
        SERVER_URL: 'https://meltingpointproductions.com',
      },
    },
  ],
};
