import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import config from './config.js'

export const __dirname = dirname(fileURLToPath(import.meta.url));

// BCRYPT
export const hashData = async (data) => {
    return bcrypt.hash(data, 10)
};

export const compareData = async (data, hashedData) => {
    return bcrypt.compare(data, hashedData);
}

// JWT Generación de tokens
export const generateToken = ( user ) => {
    const token = jwt.sign(user, config.jwt_secret, {expiresIn: 120 })
    return token;
}