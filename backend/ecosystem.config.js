module.exports = {
  apps: [
    {
      name: "melting-backend",
      script: "./server.js",
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
