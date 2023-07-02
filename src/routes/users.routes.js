const { Router } = require("express");
const UserController = require("../controllers/usersControllers");
const ensureAuthenticated = require("../middlewares/ensureAuthenticate");
const usersController = new UserController();

const usersRoutes = Router();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated ,usersController.update);

module.exports = usersRoutes;