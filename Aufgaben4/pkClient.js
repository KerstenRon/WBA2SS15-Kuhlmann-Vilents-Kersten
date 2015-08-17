var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require('fs');
var http = require('http');
var ejs = require('ejs');

var app = express();

app.get('/pkDex', jsonParser, function (req, res) {
    'use strict';
    console.log('GET eingegangen!');
    fs.readFile('./pkDex.ejs', {encoding: 'utf-8'}, function (err, filestring) {
        if (err) {
            throw err;
        } else {
            console.log('options gesetzt');
            var options = {
                host: 'localhost',
                port: '3000',
                path: '/pkDex',
                method: 'GET',
                headers: {
                    accept: 'application/json'
                }
            }

            //GET Request
            var x = http.request(options, function (x) {
                console.log("Connected");
                x.on('data', function (chunk) {
                    //Verarbeitete Response

                    var userdata = JSON.parse('{ "pkDex": '+ chunk +'}');
                    console.log('Das ist der Chunk: ' + userdata.pkDex + ' Und das ist der Filestring: ' + filestring);
                    console.log('Mischen und Randern!');

                    var userdata = JSON.parse(chunk);
                    console.log('Das ist der Chunk: ' + chunk + ' Und das ist der Filestring: ' + filestring);
                    console.log('Mischen und Rendern!');

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
app.listen(3001, function () {
    'use strict';
    console.log("Server listens on Port 3001");
});
