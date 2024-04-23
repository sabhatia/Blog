const http = require('http');
const files = require('fs');

const log_prefix = "NodeJS Server: ";

const web_srvr = http.createServer((req, rsp) => {

    console.log(log_prefix + `Req URL: ${req.url} Type: ${req.method}`);


    // decide what we want to send back
    var path = './home/';
    switch (req.url) {
        case '/':
            path += 'index.html';
            rsp.statusCode= 200;
            break;
        case '/about':
            path += 'about.html';
            rsp.statusCode = 200;
            break;
        case '/about-us':
            rsp.statusCode = 301;
            rsp.setHeader('Location', '/about');
            rsp.end();
            break;    
        default:
            path += '404.html';
            rsp.statusCode = 404;
            break;
    }

    // do the actual sending
    console.log(log_prefix + "Response path: ", path)
    files.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
        }
        rsp.end(data);
    });
    rsp.setHeader('Content-Type', 'text/html');
});

web_srvr.listen(3000, 'localhost', () => {
    console.log(log_prefix + "Listening on port: 3000");
})

