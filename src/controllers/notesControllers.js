const knex = require("../database/knex");
const AppError = require("../utils/appError");

class NotesControllers {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const { id } = request.user;
    
        const [userExist] = await knex("users").where("id", id);

        if(!userExist) {
            throw new AppError("Usuário não existe");
        };

        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id: id
        });
        
        const tagsInsert = tags.map(tag => {
            return {
                name: tag,
                user_id: id,
                note_id
            };
        });
        console.log(tagsInsert);
        
        await knex("movie_tags").insert(tagsInsert);
        
        return response.status(201).json();
    };

    async index(request, response) {
        const { id } = request.user;
        const notes = await knex("movie_notes").where({ user_id: id });
        const tags = await knex('movie_tags').where({ user_id: id });

        response.json({ notes, tags });
    };
};
module.exports = NotesControllers;