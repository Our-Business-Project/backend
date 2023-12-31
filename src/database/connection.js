import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./prod.env" });

const dbName = process.env.DATABASE_NAME;
const uri =
  "mongodb+srv://" +
  process.env.DATABASE_LOGIN +
  ":" +
  process.env.DATABASE_PASSW +
  "@" +
  process.env.DATABASE_DOMAIN +
  "/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default client;
export { dbName };
