import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
//maybe i have to add more arguments here for port and db_port
const {
  POSTGRES_HOST,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  DEFAULT_ENV,
} = process.env;

const db_parameters = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: DEFAULT_ENV === "dev" ? POSTGRES_DB : POSTGRES_TEST_DB,
});

export default db_parameters;
