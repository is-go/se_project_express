const helmet = require("helmet");

const helmetConfig = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Default src is my domain
      scriptSrc: [
        "'self'",
        "wtwr-isaic.catcher.ru",
        "www.wtwr-isaic.catcher.ru",
      ], // Allow scripts from domain
      styleSrc: [
        "'self'",
        "wtwr-isaic.catcher.ru",
        "www.wtwr-isaic.catcher.ru",
      ], // Allow styles from domain
      imgSrc: [
        "'self'",
        "data:",
        "wtwr-isaic.catcher.ru",
        "www.wtwr-isaic.catcher.ru",
      ], // Allow images from domain
      connectSrc: ["'self'", "api.wtwr-isaic.catcher.ru"], // Allow connections to api subdomain
      fontSrc: ["'self'", "wtwr-isaic.catcher.ru", "www.wtwr-isaic.catcher.ru"], // Allow fonts from domain--unsure about this one--need anothr subdomain?
      objectSrc: ["'none'"], // no <object> elements for attackers to abuse
      frameSrc: ["'none'"], // no <iframe> elements for attackers to abuse
      upgradeInsecureRequests: [], // Automatically upgrades HTTP requests to HTTPS to keep requests secure
    },
  },
  frameguard: {
    action: "deny", // Deny framing<frame> site--embedding security and clickjacking security--think myspace
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true, // Submit the domain to the HSTS preload list- works like cache?
  },
  noSniff: true, // Stops MIME-sniffing so attackers can't upload dangerous files with content headers
  xssFilter: true, // Use Cross-site scripting to block page incase of attack
  permittedCrossDomainPolicies: {
    permittedPolicies: "none", // Stops other domains contenet from being loaded to stop leaks or attcks
  },
  referrerPolicy: {
    policy: "no-referrer", // Doesn't include previous/referred site in header
  },
});

module.exports = helmetConfig;
