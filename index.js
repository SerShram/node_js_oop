const http = require('http');
const path = require('path');
const qs = require('querystring');

const {mimeTypes} = require('./utilities/mime');
const {staticFile} = require('./utilities/static_file');
const User = require('./class/User');

const PORT = 3500;

http.createServer(async function(request, response) {
    const url = request.url;

    switch(url) {
        case '/':
            console.log('main_page');
            staticFile(response, '/html/main_page.html', '.html');
            break;
            case '/reguser':
                console.log('reguser');
                if (request.method == 'POST') {
                    let body = '';
                    request.on('data', function (data) {
                        body += data;
                    });
    
                    request.on('end', async function () {
                        let post = qs.parse(body);
                        const user = new User(post.email, post.pass);
                        if (!(await user.findUser())) {
                            let result = await user.createUser();
                            if (result) {
                                response.end(JSON.stringify({
                                    "success": true,
                                    "action": "user was created"
                                }))
                            }
                            else {
                                response.end(JSON.stringify({
                                    "success": false,
                                    "action": "create user error"
                                }))
                            }
                        }
                        else {
                            response.end(JSON.stringify({
                                "success": false,
                                "action": "user exists"
                            }))
                        }
                    });
                }
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