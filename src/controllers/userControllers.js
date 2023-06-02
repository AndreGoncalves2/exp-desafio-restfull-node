const sqlConnection = require("../database/sqlite");
const AppError = require("../utils/appError");

class UserController {
    async create(request, response) {
        const { name, email, password } = request.body;
        
        const database = await sqlConnection();

        if(password === "1234") {
            throw new AppError("E-mail em uso");

        }

        database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);

        response.status(201).json();
    };
};

module.exports = UserController;