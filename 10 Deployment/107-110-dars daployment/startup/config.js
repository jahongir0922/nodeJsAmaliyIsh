const config = require("config");

module.exports = function () {
  // console.log(config);
  if (!config.get("jwtPrivateKey")) {
    console.error("Error: jwtPrivateKey is not defined.");
    process.exit(1);
  }
};
