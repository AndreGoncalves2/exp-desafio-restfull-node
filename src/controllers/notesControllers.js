const knex = require("../database/knex");
const AppError = require("../utils/appError");

class NotesControllers {
    async create(request, response) {
        const { title, description, rating } = request.body;
        const { user_id } = request.params;
    
        const [userExist] = await knex("users").where("id", user_id);

        if(!userExist) {
            throw new AppError("Usuário não existe");
        };

        await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });
        response.status(201).json();
    };
};
module.exports = NotesControllers;