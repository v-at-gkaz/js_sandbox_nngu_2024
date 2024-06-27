import db from "./databaseService.js";

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

            // FIXME: выдать jwt
            return {
                status: 'success',
                data: { jwt: 'Fixme', user }
            };
        } catch (error) {
            return {
                status: 'error',
                data: error
            };
        }
    }

}