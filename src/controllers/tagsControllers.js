const { request } = require("express");
const knex = require("../database/knex");

class TagsControllers {
    async create(request, response) {
        const { name } = request.body;

        const { user_id, note_id } = request.params;

        await knex("movie_tags").insert({
            user_id,
            note_id,
            name
        });

        return response.status(201).json();
    };
};

module.exports = TagsControllers;