const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.on("messageLogged", (arg) => {
  console.log("Listener chaqirildi", arg);
});

emitter.emit("messageLogged", { id: 1, url: "http://..." });
