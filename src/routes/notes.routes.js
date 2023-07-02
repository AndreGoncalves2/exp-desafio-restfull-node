const { Router } = require("express");

const NotesControllers = require("../controllers/notesControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticate");

const notesControllers = new NotesControllers();

const notesRouter = Router();

notesRouter.post("/", ensureAuthenticated, notesControllers.create);

module.exports = notesRouter;
