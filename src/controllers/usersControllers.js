const sqlConnection = require("../database/sqlite");
const AppError = require("../utils/appError");
const { hash, compare } = require("bcryptjs");

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
        
        return response.status(201).json();
    };
    
    async update(request, response) {
        const {name, email, password, newPassword} = request.body;
        const user_id = request.user.id;

        if (!email || !password) {
            throw new AppError("Preencha o email e a senha atual.");
        }
        const database = await sqlConnection();
        
        const user = await database.get("SELECT * FROM users WHERE id = (?)", user_id);
        
        const verifyPassword = await compare(password, user.password);
        const verifyEmail = await database.get("SELECT * FROM users WHERE email = (?)", email);
        
        if (verifyEmail.id != user.id) {
            throw new AppError("Email já está em uso");
        };
        
        if (!verifyPassword) {
            throw new AppError("Senha atual incorreta.");
        };

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        !newPassword ? user.password = user.password : user.password = await hash(newPassword,8);

        await database.run(`
        UPDATE users SET
        name = ?,
        email = ?,
        password = ?,
        updated_at = DATETIME('now')
        WHERE id = ?`, [user.name, user.email, user.password, user_id]
        );

        return response.json();
    };
};

module.exports = UserController;