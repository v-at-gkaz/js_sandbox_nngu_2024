import ContactsService from "../services/contactsService.js";

const srv = new ContactsService();

export default class ContactsController {
    get = (req, res) => {
        res.send(srv.getAll());
    };

    getOne = (req, res) => {
        res.send(srv.getOne(req.params.id));
    }

    create = (req, res) => {
        const payload = req.body;
        res.send(srv.create(payload));
    }

    update = (req, res) => {
        const payload = req.body;
        res.send(srv.update(req.params.id, payload));
    }

    delete = (req, res) => {
        res.send(srv.delete(req.params.id));
    }

}