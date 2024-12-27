const express = require("express");
const welcome = require("../routes/welcome");
const usersRoute = require("../routes/users");
const authRoute = require("../routes/auth");
const categoriesRoute = require("../routes/categories");
const customersRoute = require("../routes/customers");
const coursesRouter = require("../routes/courses");
const enrolmentsRouter = require("../routes/enrolments");

module.exports = function (app) {
  app.use(express.json());
  app.use("/", welcome);
  app.use("/api/users", usersRoute);
  app.use("/api/auth", authRoute);
  app.use("/api/categories", categoriesRoute);
  app.use("/api/customers", customersRoute);
  app.use("/api/courses", coursesRouter);
  app.use("/api/enrolments", enrolmentsRouter);
};
