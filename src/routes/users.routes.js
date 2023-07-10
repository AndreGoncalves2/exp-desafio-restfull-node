const { Router } = require("express");
const ensureAuthenticated = require("../middlewares/ensureAuthenticate");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UserController = require("../controllers/usersControllers");
const UsersAvatarControllers = require("../controllers/usersAvatarControllers");

const usersController = new UserController();
const usersAvatarController = new UsersAvatarControllers();

const upload = multer(uploadConfig.MULTER);

const usersRoutes = Router();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated ,usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar")  , usersAvatarController.update);

module.exports = usersRoutes;