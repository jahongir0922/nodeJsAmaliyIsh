const express = require("express");
const app = express();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/prod")(app);
// const usersRoute = require("./routes/users");
// const authRoute = require("./routes/auth");
// const categoriesRoute = require("./routes/categories");
// const customersRoute = require("./routes/customers");
// const coursesRouter = require("./routes/courses");
// const enrolmentsRouter = require("./routes/enrolments");
// const config = require("config");
// // console.log(config);
// if (!config.get("jwtPrivateKey")) {
//   console.error("Error: jwtPrivateKey is not defined.");
//   process.exit(1);
// }

// const mongoose = require("mongoose");
// mongoose
//   .connect("mongodb://localhost/test")
//   .then(() => {
//     console.log("mongoDBga ulandi");
//   })
//   .catch(() => {
//     console.log("MongoDbga ulanishda xatolik");
//   });

// app.use(express.json());
// app.use("/api/users", usersRoute);
// app.use("/api/auth", authRoute);
// app.use("/api/categories", categoriesRoute);
// app.use("/api/customers", customersRoute);
// app.use("/api/courses", coursesRouter);
// app.use("/api/enrolments", enrolmentsRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`I have been listened port number of ${port}...`);
});
