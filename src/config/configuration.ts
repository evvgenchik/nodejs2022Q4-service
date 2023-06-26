export const config = () => ({
  PORT: parseInt(process.env.PORT) || 4000,
  CRYPT_SALT: parseInt(process.env.CRYPT_SALT) || 10,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY: process.env.JWT_SECRET_REFRESH_KEY,
  TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME: process.env.TOKEN_REFRESH_EXPIRE_TIME,
  MAX_LOGS_FILESIZE: process.env.MAX_LOGS_FILESIZE,
  LOGS_LEVEL: process.env.LOGS_LEVEL,
});
