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

        let notes = await knex.raw(`
            SELECT mn.*, mt.tags
            FROM movie_notes mn
            JOIN (
                SELECT note_id, GROUP_CONCAT(name, ', ') AS tags
                FROM movie_tags
                GROUP BY note_id
            ) mt ON mn.id = mt.note_id
            WHERE mn.user_id = 2;
        `);

        notes.forEach(note => {
            note.tags = note.tags.split(',');
        });

        response.json({ notes });
    };

    async showNote(request, response) {
        const {id} = request.params;
        const note = await knex("movie_notes").where({ id });
        response.json({ note });
    }
};
module.exports = NotesControllers;