import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_secret_expires_in: process.env.JWT_ACCESS_SECRET_EXPIRES_IN,
};
