import ProductsService from "../services/productsService.js";
import jwt from "jsonwebtoken";
import {env} from "node:process";
import { config } from "dotenv";
import { guard } from "../guards/guard.js";
config();

const srv = new ProductsService();

export default class ProductsController {

    // First variant jwt verify
    get = async (req, res) => {
        let token = '';

        if(req.headers.authorization) {
            token = req.headers.authorization.split(' ').pop();
        }

        jwt.verify(token, env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.status(401).send({status: err});
                return;
            }
            console.log('OK PAYLOAD ? > ', decoded);
            const response = await srv.getAll();
            if (response.status === 'error') {
                res.status(500).send(response.data);
            } else {
                res.send(response.data);
            }
        });
    };

    // Second variant jwt verify
    getOne = async (req, res) => {
        guard(req, res, async (payload) => {
            console.log('OK PAYLOAD ? > ', payload);
            const response = await srv.getOne(+req.params.id);
            if (response.status === 'error') {
                res.status(500).send(response.data);
            } else {
                res.send(response.data);
            }
        });
    }

    create = async (req, res) => {
        guard(req, res, async (payload_) => {
            console.log('OK PAYLOAD ? > ', payload_);
            const payload = req.body;
            const response = await srv.create(payload);
            if (response.status === 'error') {
                res.status(500).send(response.data);
            } else if (response.status === 'validation error') {
                res.status(406).send(response.data);
            } else {
                res.status(201).send(response.data);
            }
        });
    }

    update = async (req, res) => {
        guard(req, res, async (payload_) => {
            console.log('OK PAYLOAD ? > ', payload_);
            const payload = req.body;
            const response = await srv.update(req.params.id, payload);
            if (response.status === 'error') {
                res.status(500).send(response.data);
            } else {
                res.send(response.data);
            }
        });
    }

    delete = async (req, res) => {
        guard(req, res, async (payload_) => {
            console.log('OK PAYLOAD ? > ', payload_);
            const response = await srv.delete(req.params.id);
            if (response.status === 'error') {
                res.status(500).send(response.data);
            } else {
                res.status(204).send(null);
            }
        });
    }

}