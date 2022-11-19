require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "dev",
  isProd: process.env.NODE_ENV === "production",
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  jwtSecretLogin: process.env.JWT_SECRET_LOGIN,
  jwtSecretRefresh: process.env.JWT_SECRET_REFRESH,
  jwtSecretRecovery: process.env.JWT_SECRET_RECOVERY_PASSWORD,
  email: process.env.EMAIL,
  emailPass: process.env.EMAIL_PASS,
  messageUri: process.env.MESSAGE_URI,
}

module.exports = { config };
