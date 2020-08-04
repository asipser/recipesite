module.exports = {
  apps: [
    {
      name: "recipesite",
      script: "node server/server.js",
      watch: ["server", "client"],
      env: {
        PORT: 3000,
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
        POSTGRES_CONNECTION_URI: "postgresql://asipser:eschak3@localhost:5432/recipe",
      },
    },
  ],
};
