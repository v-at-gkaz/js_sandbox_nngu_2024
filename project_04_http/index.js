import http from 'node:http';
import bodyParser from "./bodyParser.js";

let database = [];

const error500 = (res) => {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Something went wrong');
};

const error501 = (res) => {
    res.writeHead(501, {'Content-Type': 'text/plain'});
    res.end('Not Implemented');
};

const srvHandler = (req, res) => {

    const {method, url} = req;

    if(!(url.startsWith('/api/contacts') || url.startsWith('/forms'))){
        error501(res);
        return;
    }

    if(url.startsWith('/forms/one') && method === 'GET'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(
            `
<html>
<head>
    <title>form 1</title>
</head>            
<body>
<h1>Form 1</h1>
    <form method="post" action="/api/contacts" enctype="application/x-www-form-urlencoded">
    <label>Enter your name:</label>
    <input name="user-name" type="text">
    <br />
    <label>Enter your pass:</label>
    <input name="user-pass" type="password">
    <br />
    <input name="files" type="file">
    <br />
    <input type="submit" value="send">
    </form>
</body>
</html>  
            `
        );
        return;
    }

    if(url.startsWith('/forms/two') && method === 'GET'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(
            `
<html>
<head>
    <title>form 2</title>
</head>            
<body>
<h1>Form 2</h1>
    <form method="post" action="/api/contacts" enctype="text/plain">
    <label>Enter your name:</label>
    <input name="user-name" type="text">
    <br />
    <label>Enter your pass:</label>
    <input name="user-pass" type="password">
    <br />
    <input name="files" type="file">
    <br />
    <input type="submit" value="send">
    </form>
</body>
</html>  
            `
        );
        return;
    }

    if(url.startsWith('/forms/three') && method === 'GET'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(
            `
<html>
<head>
    <title>form 3</title>
</head>            
<body>
<h1>Form 3</h1>
    <form method="post" action="/api/contacts" enctype="multipart/form-data">
    <label>Enter your name:</label>
    <input name="user-name" type="text">
    <br />
    <label>Enter your pass:</label>
    <input name="user-pass" type="password">
    <br />
    <input name="files" type="file">
    <br />
    <input type="submit" value="send">
    </form>
</body>
</html>  
            `
        );
        return;
    }

    switch (method) {
        case 'GET':
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(database));
            break;
        case 'POST':
            let data = '';
            req.on('data', (chunk)=> {
                if(chunk) {
                    data+=chunk;
                }
            });
            req.on('end', ()=> {

                const body = data.toString();
                const contentType= req.headers['content-type'];

                const parsedBody = bodyParser(contentType, body);

                const newRecord = {
                    id: Date.now(),
                    name: parsedBody.find(item=>{
                        return item.name === 'name'
                    }).value,
                    phone: parsedBody.find(item=>{
                        return item.name === 'phone'
                    }).value
                };

                database.push(newRecord);

                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify(newRecord));
            });
            break;
        case 'PATCH':
            // TODO: Домашнее задание - попробовать реализовать самостоятельно
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end('{"id": 1, "name": "Ivanov Ivan","phone": "89998886655"}');
            break;
        case 'DELETE':
            const id = url.replace('/api/contacts/', '');
            database = database.filter(item=>{
                return item.id !== +id;
            });
            res.writeHead(204);
            res.end(null);
            break;
        default:
            error500(res);
    }

};

const srv = http.createServer(srvHandler);

srv.listen(8000, () => {
    console.log('server listen on port 8000');
});