import express from 'express';
import { env } from 'node:process';
import bodyParser from "body-parser";
import { config } from "dotenv";
config();

import ProductsController from "./controllers/productsController.js";
const productsCtrl = new ProductsController();

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

// backend
app.get('/api/products', productsCtrl.get);
app.get('/api/products/:id', productsCtrl.getOne);
app.post('/api/products', productsCtrl.create);
app.patch('/api/products/:id', productsCtrl.update);
app.delete('/api/products/:id', productsCtrl.delete);

const port = env.EXPRESS_APP_PORT || 3003;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});