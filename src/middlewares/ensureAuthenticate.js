const { verify } = require('jsonwebtoken');
const authConfig = require('../configs/auth');
const AppError = require('../utils/appError');

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT não informado");
    };

    const [, token ] = authHeader.split(' ');
    
    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret);
        request.user = {
            id: Number(user_id),
        };

        return next();
    } catch {
        throw new AppError("JWT invalido");
    };
};

module.exports = ensureAuthenticated;