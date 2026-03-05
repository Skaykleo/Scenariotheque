require("dotenv").config();
const { defineConfig } = require("prisma/config");
const { PrismaPg } = require("@prisma/adapter-pg");

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    connectionString: process.env.DIRECT_URL,
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
