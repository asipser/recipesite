const { Pool } = require("pg");
const logger = require("pino")(); // import pino logger

let pool;

module.exports = {
  getPool: () => pool,
  init: () => {
    const connectionString = process.env.POSTGRES_CONNECTION_URI;
    pool = new Pool({ connectionString });
    pool.connect((err, client, done) => {
      if (err) logger.error("Error connecting to Postgres", err);
      else logger.info("Server connected to Postgres");
      done(err);
    });
    pool.on("error", function (err) {
      logger.error("Postgres err: ", err);
    });
  },
  query: (text, params) => {
    return pool.query(text, params);
  },
};
