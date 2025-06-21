import jwt from 'jsonwebtoken';
import {errorHandler} from './errorHandler.js';

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            return new errorHandler(res, 401, "Unauthorized: No token provided.").send();
        }

        const token = authorization.replace("Bearer ", "").trim();
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return new errorHandler(res, 401, 'Unauthorized: Token has expired.').send();
        }
        if (error instanceof jwt.JsonWebTokenError) { 
            return new errorHandler(res, 401, 'Unauthorized: Invalid token.').send();
        }

        return new errorHandler(res, 500, 'Internal Server Error: Failed to authenticate token.', [error.message]).send();
    }
};