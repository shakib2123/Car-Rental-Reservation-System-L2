import dotenv from "dotenv";
import path from "path";

dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
};
