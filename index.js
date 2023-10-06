const http = require('http');
const path = require('path');
const qs = require('querystring');

const {mimeTypes} = require('./utilities/mime');
const {staticFile} = require('./utilities/static_file');

const PORT = 3500;

http.createServer(async function(request, response) {
    const url = request.url;

    switch(url) {
        case '/':
            console.log('main_page');
            staticFile(response, '/html/main_page.html', '.html');
            break;
        default: 
            const extname = String(path.extname(url)).toLocaleLowerCase();

            if(extname in mimeTypes) {
                staticFile(response, url, extname);
            } else {
                res.statusCode = 404;
                res.end();
            }
    }
}).listen(PORT);