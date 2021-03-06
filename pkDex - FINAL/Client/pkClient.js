var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
var http = require('http');
var ejs = require('ejs');

var app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.get('/', jsonParser, function (req, res) {
    res.render('index');
});

app.get('/about', jsonParser, function (req, res) {
    res.render('about');
});
    
//GET pkDex Erarbeitet von Ron, Leon 17.08. 10 - 12Uhr
app.get('/pkDex', jsonParser, function (req, res) {
    fs.readFile('./views/pkDex.ejs', {encoding: 'utf-8'}, function (err, filestring) {
        if (err) {
            throw err;
        } else {
            var options = {
                host: 'localhost',
                port: '3000',
                path: '/pkDex',
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            };
                
            //GET Request
            var x = http.request(options, function (x) {
                console.log("Connected");
                x.on('data', function (chunk) {
                    //Verarbeitete Response
                    var userdata = JSON.parse('{ "pkDex": '+ chunk +'}');
                    var html = ejs.render(filestring, userdata);
                    res.setHeader('content-type', 'text/html');
                    res.writeHead(200);
                    res.write(html);
                    res.end();
                });
            });

        //wenn http.request verwendet wird muss immer ein end(); kommen
            x.end();
        }
    });
});

//GET pkTeam Erarbeitet von Ron, Leon 17.08 10 - 12Uhr
app.get('/pkTeam', jsonParser, function (req, res) {
    fs.readFile('./views/pkTeam.ejs', {encoding: 'utf-8'}, function (err, filestring) {
        if (err) {
            throw err;
        } else {
            var options = {
                host: 'localhost',
                port: '3000',
                path: '/pkTeam',
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            };

            //GET Request
            var x = http.request(options, function (x) {
                console.log("Connected");
                x.on('data', function (chunk) {
                    //Verarbeitete Response
                    var userdata = JSON.parse('{ "pkTeam": '+ chunk +'}');
                    var html = ejs.render(filestring, userdata);
                    res.setHeader('content-type', 'text/html');
                    res.writeHead(200);
                    res.write(html);
                    res.end();
                });
            });

        //wenn http.request verwendet wird muss immer ein end(); kommen
            x.end();
        }
    });
});
//GET pkUser Erabeitet von Ron  15.00 - 16.12Uhr
app.get('/pkUser', jsonParser, function (req, res) {
    fs.readFile('./views/pkUser.ejs', {encoding: 'utf-8'}, function (err, filestring) {
        if (err) {
            throw err;
        } else {
            var options = {
                host: 'localhost',
                port: '3000',
                path: '/pkUser',
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            };

            //GET Request
            var x = http.request(options, function (x) {
                console.log("Connected");
                x.on('data', function (chunk) {
                    //Verarbeitete Response
                    var userdata = JSON.parse('{ "pkUser": '+ chunk +'}');
                    var html = ejs.render(filestring, userdata);
                    res.setHeader('content-type', 'text/html');
                    res.writeHead(200);
                    res.write(html);
                    res.end();
                });
            });

        //wenn http.request verwendet wird muss immer ein end(); kommen
            x.end();
        }
    });
});

//GET result, copy-pasted von Leon am 06.9.2015 20.38Uhr
app.get('/result', jsonParser, function (req, res) {
    fs.readFile('./views/result.ejs', {encoding: 'utf-8'}, function (err, filestring) {
        if (err) {
            throw err;
        } else {
            var options = {
                host: 'localhost',
                port: '3000',
                path: '/pkUser',
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            };

            //GET Request
            var x = http.request(options, function (x) {
                console.log("Connected");
                x.on('data', function (chunk) {
                    //Verarbeitete Response
                    var userdata = JSON.parse('{ "pkUser": '+ chunk +'}');
                    var html = ejs.render(filestring, userdata);
                    res.setHeader('content-type', 'text/html');
                    res.writeHead(200);
                    res.write(html);
                    res.end();
                });
            });

        //wenn http.request verwendet wird muss immer ein end(); kommen
            x.end();
        }
    });
});

//GET click Erarbeitet von Ron und Leon
app.get('/click', jsonParser, function (req, res) {
    fs.readFile('./views/click.ejs', {encoding: 'utf-8'}, function (err, filestring) {
        if (err) {
            throw err;
        } else {
            //ACHTUNG: Es muss ein GET-Request auf die /pkUser gemacht werden,
            //da die click-Ressource darauf ebenfalls zugreift!
            var options = {
                host: 'localhost',
                port: '3000',
                path: '/pkUser',
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            };

            //GET Request
            var x = http.request(options, function (x) {
                console.log("Connected");
                x.on('data', function (chunk) {
                    //Verarbeitete Response
                    var userdata = JSON.parse('{ "pkUser": '+ chunk +'}');
                    var html = ejs.render(filestring, userdata);
                    res.setHeader('content-type', 'text/html');
                    res.writeHead(200);
                    res.write(html);
                    res.end();
                });
            });

        //wenn http.request verwendet wird muss immer ein end(); kommen
            x.end();
        }
    });
});

//GET pkUser Erabeitet von Ron am 18.08. 10.00 - 10.25Uhr
app.get('/pkUser/:sign', jsonParser, function (req, res) {
    var sign = req.params.sign;
    fs.readFile('./views/pkUserPrm.ejs', {encoding: 'utf-8'}, function (err, filestring) {
        if (err) {
            throw err;
        } else {
            var options = {
                host: 'localhost',
                port: '3000',
                path: '/pkUser/' + sign,
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            };

            //GET Request
            var x = http.request(options, function (x) {
                console.log("Connected");
                x.on('data', function (chunk) {
                    //Verarbeitete Response
                    var userdata = JSON.parse('{ "pkUser": '+ chunk +'}');
                    var html = ejs.render(filestring, userdata);
                    res.setHeader('content-type', 'text/html');
                    res.writeHead(200);
                    res.write(html);
                    res.end();
                });
            });

        //wenn http.request verwendet wird muss immer ein end(); kommen
            x.end();
        }
    });
});

//GET pkDex Erabeitet von Ron am 18.08. 10:25 - 10.36Uhr
app.get('/pkDex/:sign', jsonParser, function (req, res) {
    var sign = req.params.sign;
    fs.readFile('./ejs/pkDex.ejs', {encoding: 'utf-8'}, function (err, filestring) {
        if (err) {
            throw err;
        } else {
            var options = {
                host: 'localhost',
                port: '3000',
                path: '/pkDex/' + sign,
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            };

            //GET Request
            var x = http.request(options, function (x) {
                console.log("Connected");
                x.on('data', function (chunk) {
                    //Verarbeitete Response
                    var userdata = JSON.parse('{ "pkDex": '+ chunk +'}');
                    var html = ejs.render(filestring, userdata);
                    res.setHeader('content-type', 'text/html');
                    res.writeHead(200);
                    res.write(html);
                    res.end();
                });
            });

        //wenn http.request verwendet wird muss immer ein end(); kommen
            x.end();
        }
    });
});

//GET pkTeam Erabeitet von Ron am 18.08. 10.25- 10.36Uhr
app.get('/pkTeam/:sign', jsonParser, function (req, res) {
    var sign = req.params.sign;
    fs.readFile('./ejs/pkTeam.ejs', {encoding: 'utf-8'}, function (err, filestring) {
        if (err) {
            throw err;
        } else {
            var options = {
                host: 'localhost',
                port: '3000',
                path: '/pkTeam/' + sign,
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            };

            //GET Request
            var x = http.request(options, function (x) {
                console.log("Connected");
                x.on('data', function (chunk) {
                    //Verarbeitete Response
                    var userdata = JSON.parse('{ "pkTeam": '+ chunk +'}');
                    var html = ejs.render(filestring, userdata);
                    res.setHeader('content-type', 'text/html');
                    res.writeHead(200);
                    res.write(html);
                    res.end();
                });
            });

        //wenn http.request verwendet wird muss immer ein end(); kommen
            x.end();
        }
    });
});
//Client listen on Port 3001
app.listen(3001, function () {
    console.log("Server listens on Port 3001");
});
