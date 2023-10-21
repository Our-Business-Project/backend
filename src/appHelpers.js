import dotenv from "dotenv";
import client, { dbName } from "./database/connection.js";

dotenv.config();

const checkAppBeforeStart = () => {
  async function run() {
    try {
      await client.connect();
      await client.db(dbName).command({ ping: 1 });
      console.log("You successfully connected to MongoDB!");
    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
};

const gracefulShutdown = (server) => {
  console.log("Starting graceful shutdown...");

  server.close((error) => {
    if (error) {
      console.error("Error while closing server:", error);
    } else {
      console.log("Server closed");
    }
  });
};

export { checkAppBeforeStart, gracefulShutdown };
