import http from 'node:http';

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

    // console.log('url', url);

    if(!url.startsWith('/api/contacts')){
        error501(res);
        return;
    }

    switch (method) {
        case 'GET':
            // TODO: Вместо тестовых данных использовать массив объектов как псевдо-базу данных
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end('[{"id": 1, "name": "Ivanov Ivan","phone": "89998886655"},{"id": 2, "name": "Ivanov Petrov","phone": "89998886600"}]');
            break;
        case 'POST':
            // TODO: Читать тело запроса и создавать объекто в хранилище
            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end('{"id": 1, "name": "Ivanov Ivan","phone": "89998886655"}');
            break;
        case 'PATCH':
            // TODO: считать id из запроса, найти запись, заменить данные в ней и вернуть изменённый объект
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end('{"id": 1, "name": "Ivanov Ivan","phone": "89998886655"}');
            break;
        case 'DELETE':
            // TODO: считать id из запроса, найти запись и удалить
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