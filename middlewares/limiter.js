const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15m limit
  max: 100, // Limit each IP to 100 requests every 15m
  message: "Too many requests from this IP, please try again later.",
  statusCode: 429,
  headers: true,
});

module.exports = limiter;
