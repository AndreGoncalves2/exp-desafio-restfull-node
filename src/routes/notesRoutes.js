const { Router } = require("express");

const NotesControllers = require("../controllers/notesControllers");

const notesControllers = new NotesControllers();

const notesRouter = Router();

notesRouter.post("/:user_id", notesControllers.create);

module.exports = notesRouter;
