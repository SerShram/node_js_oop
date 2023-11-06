const http = require('http');
const path = require('path');
const qs = require('querystring');

const {mimeTypes} = require('./utilities/mime');
const {staticFile} = require('./utilities/static_file');
const {parseCookies} = require('./utilities/parse_cookies');

const PORT = 3500;

const User = require('./class/User');
const Authkey = require('./class/Authkey');


http.createServer(async function(request, response) {
    const url = request.url;

    switch(url) {
        case '/':
            // console.log('main_page');
            staticFile(response, '/html/main_page.html', '.html');
            break;
        case '/admin': 
            // console.log('admin');
            cookies = parseCookies(request);
            if (cookies.auth) {
                let result = await Authkey.checkCookie(cookies.auth);
                if (result) {
                    staticFile(response, '/html/admin.html', '.html');
                }
                else {
                    response.setHeader('Set-Cookie', ['auth="";max-age=-1', 'u=;max-age=0']);
                    staticFile(response, '/html/login.html', '.html');
                }
            }
            else {
                response.setHeader('Set-Cookie', ['auth="";max-age=-1', 'u=;max-age=0']);
                staticFile(response, '/html/login.html', '.html');
            }
        break;
        case '/login':
            // console.log('login');
            staticFile(response, '/html/login.html', '.html');
        break;
        case '/login-user':
            console.log('login-user');
            if (request.method == 'POST') {
                let body = '';
                request.on('data', function (data) {
                    body += data;
                });

                request.on('end', async function () {
                    let post = qs.parse(body);
                    const user = new User(post.email, post.pass);
                    let auth = await user.authUser();
                    if (auth) {
                        let cookie = await Authkey.createAuthKey(auth.id);
                        let ts = new Date();
                        ts.setDate(ts.getDate() + 7);
                        response.end(JSON.stringify({
                            "success": true,
                            "action": "You are logged in",
                            "cookie" : "auth="+cookie.authkey+"; expires="+ts.toGMTString()+"; path=/"
                        }))
                    }
                    else {
                        response.end(JSON.stringify({
                            "success": false,
                            "action": "user not found"
                        }))
                    }
                });
            }
            break;

        case '/reguser':
            // console.log('reguser');
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