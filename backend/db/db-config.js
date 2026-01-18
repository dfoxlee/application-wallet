import mysql from "mysql2/promise";

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
   host: process.env.DB_HOST || "your-db-host",
   user: process.env.DB_USER || "your-db-username",
   password: process.env.DB_PASSWORD || "your-db-password",
   database: process.env.DB_NAME || "your-db-name",
   waitForConnections: true,
   connectionLimit: 10,
   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
   queueLimit: 0,
   enableKeepAlive: true,
   keepAliveInitialDelay: 0,
});

export default pool;
