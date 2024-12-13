const { Pool, Client } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

(async () => {
  try {
    const client = await pool.connect();
    console.log("Connected to the databse succesfull");
    client.release();
  } catch (error) {
    console.error("Error connecting to the database", err);
    process.exit(-1);
  }
})();

module.exports = pool;
