const { Router }  = require("express");

const userRoutes = require("./userRoutes");

const routes = Router();

routes.use("/users", userRoutes);

module.exports = routes;

