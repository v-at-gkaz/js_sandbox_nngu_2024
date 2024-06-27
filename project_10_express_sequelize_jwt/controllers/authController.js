import AuthService from "../services/authService.js";

const srv = new AuthService();

export default class AuthController {
    signup = async (req, res) => {
        const payload = req.body;
        const response = await srv.signup(payload);
        if(response.status === 'error') {
            res.status(500).send(response.data);
        } else if(response.status === 'validation error') {
            res.status(406).send(response.data);
        } else {
            res.status(201).send(response.data);
        }
    }

    signin = async (req, res) => {
        const payload = req.body;
        const response = await srv.signin(payload);
        if(response.status === 'error') {
            res.status(500).send(response.data);
        } else if(response.status === 'validation error') {
            res.status(406).send(response.data);
        } else if(response.status === 'auth error') {
            res.status(401).send(response.data);
        } else {
            res.status(201).send(response.data);
        }
    }

}