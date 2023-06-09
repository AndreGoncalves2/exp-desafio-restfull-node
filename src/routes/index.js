const { Router }  = require("express");

const usersRoutes = require("./usersRoutes");
const notesRoutes = require("./notesRoutes");
const tagsRoutes = require("./tagsRoutes")

const routes = Router();

routes.use("/notes", notesRoutes);
routes.use("/users", usersRoutes);
routes.use("/tags", tagsRoutes);

module.exports = routes;

