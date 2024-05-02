import express from 'express';
import { env } from 'node:process';

const app = express();

app.use(express.static('public'));


// backend
app.get('/api', (req, res) => {
    res.send('Hello World!');
    // res.send({ response :'Hello World!' });
});

const port = env.EXPRESS_APP_PORT || 3003;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});