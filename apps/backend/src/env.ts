export const env = {
  serverPort: parseInt(process.env.PORT || "4000", 10),
  jwtSecret: process.env.JWT_SECRET || "secret",
};
