const knex = require("../database/knex");
const AppError = require("../utils/appError");

class NotesControllers {
    async create(request, response) {
        const { title, description, rating } = request.body;
        const { id } = request.user;
    
        const [userExist] = await knex("users").where("id", id);

        if(!userExist) {
            throw new AppError("Usuário não existe");
        };

        await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id: id
        });
        return response.status(201).json();
    };
};
module.exports = NotesControllers;