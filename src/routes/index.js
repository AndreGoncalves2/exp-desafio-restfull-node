const { Router }  = require("express");

const usersRoutes = require("./users.routes");
const notesRoutes = require("./notes.routes");
const tagsRoutes = require("./tags.routes")
const sessionRoutes = require("./sessions.routes");

const routes = Router();

routes.use("/notes", notesRoutes);
routes.use("/users", usersRoutes);
routes.use("/tags", tagsRoutes);
routes.use("/session", sessionRoutes);

module.exports = routes;

