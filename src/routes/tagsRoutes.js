const { Router } =  require("express");
const TagsController = require("../controllers/tagsControllers");

const tagsController = new TagsController();

const tagsRouter = Router();
tagsRouter.post("/:user_id/:note_id", tagsController.create);

module.exports = tagsRouter;
