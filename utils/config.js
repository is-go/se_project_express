require("dotenv").config();

const { JWT_SECRET = "auth code" } = process.env;

module.exports = { JWT_SECRET };
