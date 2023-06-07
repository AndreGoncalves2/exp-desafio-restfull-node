const sqlConnection = require("../database/sqlite");
const AppError = require("../utils/appError");
const { hash } = require("bcryptjs");

class UserController {
    async create(request, response) {
        const { name, email, password } = request.body;
        
        const database = await sqlConnection();

        const userExist = await database.get("SELECT * FROM users WHERE email = (?)", email);

        if(userExist) {
            throw new AppError("Email já esta em uso");
        };

        const hashedPassword = await hash(password, 8);

        database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);

        response.status(201).json();
    };
};

module.exports = UserController;