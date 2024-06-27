import db from "./databaseService.js";
import jwt from "jsonwebtoken";
import { env } from 'node:process';
import { config } from "dotenv";
config();

export default class AuthService {

    signup = async (payload) => {
        if (!(payload.email && payload.password)) {
            return {
                status: 'validation error',
                data: {error: 'wrong data to signup'}
            };
        }

        try {
            return {
                status: 'success',
                data: await db.User.create({
                    login: payload.email,
                    password: payload.password
                })
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    }

    signin = async (payload) => {

        if (!(payload.email && payload.password)) {
            return {
                status: 'validation error',
                data: {error: 'wrong data to signin'}
            };
        }

        try {

            const user = await db.User.findOne({where: {login: payload.email, password: payload.password}});

            if(!user) {
                return {
                    status: 'auth error',
                    data: {error: 'unauthorized'}
                };
            }

            const token = jwt.sign({ sub: { id: user.id, login: user.login } }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });

            return {
                status: 'success',
                data: { token }
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    }

}