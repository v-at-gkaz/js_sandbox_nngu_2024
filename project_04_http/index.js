import http from 'node:http';

const srvHandler = (req, res) => {

    const {method, url} = req;

    /*if(method === 'POST') {
        res.end('POST');
    }

    res.writeHead(500, {'Content-Type': 'text/plain'});*/
    res.end('SIMPLE RESPONSE');

    // const response = {
    //     status: "echo",
    //     url: req.url
    // };
    //
    // res.writeHead(200, {'Content-Type': 'text/plain'}); // application/json, text/plain, text/html
    // res.end('<b>Hello</b>');
    //res.end(JSON.stringify(response));
};

const srv = http.createServer(srvHandler);

srv.listen(8000, () => {
    console.log('server listen on port 8000');
});