const { Router } = require("express");

const SessionsControllers = require("../controllers/sissionsControllers");

const sessionsControllers = new SessionsControllers();

const sessionsRouter = Router();

sessionsRouter.post("/", sessionsControllers.create);

module.exports = sessionsRouter;