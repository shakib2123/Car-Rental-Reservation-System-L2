import dotenv from "dotenv";

dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_secret_expires_in: process.env.JWT_ACCESS_SECRET_EXPIRES_IN,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  payment_success_url: process.env.PAYMENT_SUCCESS_URL,
  payment_cancel_url: process.env.PAYMENT_CANCEL_URL,
  aamarpay_store_id: process.env.AAMAR_PAY_STORE_ID,
  aamarpay_signature_key: process.env.AAMAR_PAY_SIGNATURE_KEY,
  aamarpay_payment_url: process.env.AAMAR_PAY_PAYMENT_URL,
  aamarpay_verify_url: process.env.AAMAR_PAY_VERIFY_URL,
};
