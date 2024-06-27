const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("messageLogging", (arg) => {
    console.log("Listener chaqirildi", arg);
  });
  
  emitter.emit("messageLogging", { id: 1, url: "http://..." });
  
