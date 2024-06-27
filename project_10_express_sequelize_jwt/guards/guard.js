import jwt from "jsonwebtoken";
import { env } from 'node:process';
import { config } from "dotenv";
config();

export const guard = (req, res, cb) => {
    const token = req.headers.authorization.split(' ').pop();
    jwt.verify(token, env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            res.status(401).send({status: err});
            return;
        }
        cb(decoded);
    });
}