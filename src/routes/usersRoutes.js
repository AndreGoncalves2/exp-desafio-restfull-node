const { Router } = require("express");
const UserController = require("../controllers/usersControllers");

const usersController = new UserController();

const usersRoutes = Router();

usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;