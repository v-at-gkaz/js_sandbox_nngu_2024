import CustomersService from "../services/customersService.js";

const srv = new CustomersService();

export default class CustomersController {
    get = async (req, res) => {
        const response = await srv.getAll();
        if(response.status === 'error') {
            res.status(500).send(response.data);
        } else {
            res.send(response.data);
        }
    };

    getOne = async (req, res) => {
        const response = await srv.getOne(+req.params.id);
        if(response.status === 'error') {
            res.status(500).send(response.data);
        } else {
            res.send(response.data);
        }
    }

    create = async (req, res) => {
        const payload = req.body;
        const response = await srv.create(payload);
        if(response.status === 'error') {
            res.status(500).send(response.data);
        } else if(response.status === 'validation error') {
            res.status(406).send(response.data);
        } else {
            res.status(201).send(response.data);
        }
    }

    update = async (req, res) => {
        const payload = req.body;
        const response = await srv.update(req.params.id, payload);
        if(response.status === 'error') {
            res.status(500).send(response.data);
        } else {
            res.send(response.data);
        }
    }

    delete = async (req, res) => {
        const response = await srv.delete(req.params.id);
        if(response.status === 'error') {
            res.status(500).send(response.data);
        } else {
            res.status(204).send(null);
        }
    }

}