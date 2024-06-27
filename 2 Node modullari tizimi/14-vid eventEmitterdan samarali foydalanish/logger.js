const EventEmitter = require("events");

class Logger extends EventEmitter {
  log(message) {
    // bu yerda messageni urlga http post qilib jo'natish kodi bo'lishi kerak
    console.log(message);
    this.emit("messageLogged", { id: 1, url: "http://..." });
  }
}
module.exports = Logger;
