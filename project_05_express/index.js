import express from 'express';
import { env } from 'node:process';
import bodyParser from "body-parser";

import ContactsController from "./controllers/contactsController.js";
const contactsCtrl = new ContactsController();

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

// backend
app.get('/api/contacts', contactsCtrl.get);
app.get('/api/contacts/:id', contactsCtrl.getOne);
app.post('/api/contacts', contactsCtrl.create);
app.patch('/api/contacts/:id', contactsCtrl.update);
app.delete('/api/contacts/:id', contactsCtrl.delete);

const port = env.EXPRESS_APP_PORT || 3003;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});