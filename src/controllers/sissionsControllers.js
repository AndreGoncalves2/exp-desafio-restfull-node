const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");
const knex = require("../database/knex");

const AppError = require("../utils/appError");
const { compare } = require("bcryptjs");

class SessionsControllers { 
    async create(request, response) {
        const { email, password } = request.body;

        if (!email || !password) {
            throw new AppError("Preencha todos os campos.");
        };
        
        const [user] = await knex("users").where({ email });

        if (!user) {
            throw new AppError("Email ou senha incorreta.");
        };

        const userAuth = await compare(password, user.password);

        if (!userAuth) {
            throw new AppError("Email ou senha incorreta.");
        };
        
        
        const { secret, expiresIn} = authConfig.jwt;
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.json({ user, token });
    };
};

module.exports = SessionsControllers;