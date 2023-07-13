const AppError = require("../utils/appError");
const { hash, compare } = require("bcryptjs");

class UserCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    };

    async execute({ name, email, password }) {

        const userExist = await this.userRepository.findByEmail(email);

        if(userExist) {
            throw new AppError("Email já esta em uso");
        };
        
        const hashedPassword = await hash(password, 8);
        
        await this.userRepository.create({ name, email, password: hashedPassword });
    };
};

module.exports = UserCreateService;