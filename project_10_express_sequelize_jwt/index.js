import express from 'express';
import { env } from 'node:process';
import bodyParser from "body-parser";
import { config } from "dotenv";
config();

import AuthController from "./controllers/authController.js";
import ProductsController from "./controllers/productsController.js";
import CustomersController from "./controllers/customersController.js";

const authCtrl = new AuthController();
const productsCtrl = new ProductsController();
const customersCtrl = new CustomersController();

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

// backend:

// Auth
app.post('/api/auth/signup', authCtrl.signup);
app.post('/api/auth/signin', authCtrl.signin);

// Products
app.get('/api/products', productsCtrl.get);
app.get('/api/products/:id', productsCtrl.getOne);
app.post('/api/products', productsCtrl.create);
app.patch('/api/products/:id', productsCtrl.update);
app.delete('/api/products/:id', productsCtrl.delete);

// Customers
app.get('/api/customers', customersCtrl.get);
app.get('/api/customers/:id', customersCtrl.getOne);
app.post('/api/customers', customersCtrl.create);
app.patch('/api/customers/:id', customersCtrl.update);
app.delete('/api/customers/:id', customersCtrl.delete);

const port = env.EXPRESS_APP_PORT || 3003;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});