export const env = {
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: parseInt(process.env.DB_PORT || "5432", 10),
  dbUsername: process.env.DB_USERNAME,
  dbDatabase: process.env.DB_DATABASE,
  serverPort: parseInt(process.env.PORT || "3000", 10),
  jwtSecret: process.env.JWT_SECRET || "secret",
};
