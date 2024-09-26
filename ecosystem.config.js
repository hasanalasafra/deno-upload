module.exports = {
  apps: [
    {
      name: 'deno-api',
      script: '/root/.deno/bin/deno',
      args: 'run --allow-net --allow-write --allow-read index.ts', // Adjust according to your Deno application
      interpreter: 'none', // Deno doesn't require an interpreter
      exec_mode: 'fork', // Deno applications usually run in a single instance
      watch: false, // Enable if you want PM2 to restart on file changes
      env: {
        PORT: 8000,
        NODE_ENV: 'production',
      },
    },
  ],
};