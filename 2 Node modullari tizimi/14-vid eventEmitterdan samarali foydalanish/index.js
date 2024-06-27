const Logger = require("./logger");
const logger = new Logger();

logger.on("messageLogged", (arg) => {
  console.log("Listener chaqirildi: ", arg);
});

logger.log("message");
