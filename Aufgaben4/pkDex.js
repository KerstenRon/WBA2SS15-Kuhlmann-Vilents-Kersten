//Das ist unser "PkDex"
//Einbinden der Module und erstellen von Instanzen
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();

//Externe JSON-Dateien mit Node.js | FileSystem('fs') einlesen, damit man diese außerhalb der Serverimplementierung verwalten.
var fs = require('fs');
var file = __dirname + '/pkDexGen1.json'
var content;
function readContent(callback) {
fs.readFile(file, function (err, data) {
    if(err) {
       return callback(err);
    }
    var data = JSON.parse(data);
    callback(null, data);
});
};

readContent(function (err, content) {
    pkDex=content.pkdexGen1;
});

//GET auf die Indexseite
app.get('/', function(req, res) {
    //res.send('Willkommen in deinem persönlichen PkDex!');
    
//Der Client kann sich jetzt aussuchen welchen Datentyp zurückgegeben werden soll (Hier auswahl zwischen den Accepttypes: 'html' und 'json').
//Wird der Datentyp nicht akzeptiert wird der Fehlercode '406' zurückgegeben ('resource ... cannot be provided in a format specified in the Accept headers ...'). 
    var acceptType = req.accepts(['html', 'json']);
    switch(acceptType) {
        case 'html':
            res.type('html').send('<h1>Willkommen in deinem persönlichen PkDex!<h1>');//text/html
            break;
        case 'json':
            res.json({content: 'Willkommen in deinem persönlichen PkDex!'});//application/json
            break;
        default:
            res.status(406).end();
    }
});

//Per GET kann man auf die Datei '/pkDex' zugreifen | Ruckgabe von Status '200' und der JSON 'pkDex'
app.get('/pkDex', function(req, res){
    res.status(200).json(pkDex);
});
//Per GET wird auf eine beliebige 'index' in der JSON 'pkDex' zugegriffen sollte ein Fehler auftreten (z.B.: index nicht vorhanden) wird der Statuscode '404' ausgegeben.
app.get('/pkDex/:id', jsonParser, function(req, res){
    var id = req.params.id;
    console.log("Die Angeforderte id ist: "+id);
    
    var filt = pkDex.filter(function(value, index, arr){
        return value.id == id;
    });
    
    if (filt.length >= 1) {
        res.status(200).json(filt);
    } else {
        res.status(404).end();
    }
});

//Per POST können neue Objekte(Einträge) an die JSON 'pkDex' angehangen werden. Dabei sollte die Syntax...
    //{"index":"xxx",
    // "name":"string",
    // "typ1":"string",
    // "typ2":"string",
    // "des":"string"}
//...beachtet werden.
app.post('/pkDex', jsonParser, function(req, res){
    pkDex.push(req.body);
    res.type('plain').send('Added!');
});

//Server erwartet req über Port 1337
app.listen(1337);