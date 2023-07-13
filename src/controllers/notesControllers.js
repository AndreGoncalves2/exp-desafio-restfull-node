const knex = require("../database/knex");
const AppError = require("../utils/appError");

class NotesControllers {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const { id } = request.user;
    
        const [userExist] = await knex("users").where({ id });

        if(!userExist) {
            throw new AppError("Usuário não existe");
        };

        if (rating > 5 || rating < 0 || isNaN(rating)) {
            throw new AppError("A nota precisa ser um numero de 0 a 5");
        };

        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id: id
        });
        
        if (tags.length > 0){
            const tagsInsert = tags.map(tag => {
                return {
                    name: tag,
                    user_id: id,
                    note_id
                };
            });

            await knex("movie_tags").insert(tagsInsert);
        };
        
        return response.status(201).json();
    };

    async delete(request, response) {
        const { id } = request.params;
        await knex("movie_notes").where({ id }).delete();

        return response.json();
    };

    async index(request, response) {
        const { id } = request.user;
        const { title } = request.query;

        let notes = await knex.raw(`
            SELECT mn.*, mt.tags
            FROM movie_notes mn
            LEFT JOIN (
                SELECT note_id, GROUP_CONCAT(name, ', ') AS tags
                FROM movie_tags
                GROUP BY note_id
            ) mt ON mn.id = mt.note_id
            WHERE mn.user_id = ${id}
            AND 
            mn.title LIKE '%${title}%';
        `);
        
        notes.forEach(note => {
            if (note.tags == null) {
                note.tags = [];
            } else {
                note.tags = note.tags.split(',');
            };
        });

        return response.json({ notes });
    };

    async showNote(request, response) {
        const { id } = request.params;
        
        let [note] = await knex.raw(`
            SELECT mn.*, mt.tags
            FROM movie_notes mn
            LEFT JOIN (
                SELECT note_id, GROUP_CONCAT(name, ', ') AS tags
                FROM movie_tags
                GROUP BY note_id
            ) mt ON mn.id = mt.note_id
            WHERE mn.id = ${id}
        `);

        if (note.tags == null) {
            note.tags = []
        } else {
            note.tags = note.tags.split(',');
        };

        return response.json({ note });
    };
};
module.exports = NotesControllers;