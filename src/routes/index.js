const { Router }  = require("express");

const usersRoutes = require("./usersRoutes");
const notesRouters = require("./notesRoutes");

const routes = Router();

routes.use("/notes", notesRouters);
routes.use("/users", usersRoutes);


module.exports = routes;

