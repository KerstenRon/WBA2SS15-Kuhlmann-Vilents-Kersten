//Einbinden der einzelnen Module
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var app = express();
//Es wird ein JSON-Objekt angelegt
var data = [
    {title: "ReqRes"},
    {title: "ReqRes2"},
    {title: "ReqResOmega"}
    ]
//Es wird bei einen Request an die Serverstartseite ein Satz ausgegeben
app.get('/', function(req, res) {
    //res.send('Willkommen bei *ReqRes* !');
    
//Der Client kann sich jetzt aussuchen welchen Datentyp zurückgegeben werden soll (Hier auswahl zwischen 'html' und 'json')
//Wird der Datentyp nicht akzeptiert wird der Fehlercode '406' zurückgegeben ('resource ... cannot be provided i a format specified in the Accept headers ...') 
    var acceptType = req.accepts(['html', 'json']);
    switch(acceptType) {
        case 'html':
            res.type('html').send('<h1>Willkommen bei *ReqRes* !<h1>');
            break;
        case 'json':
            res.json({content: 'Willkommen bei *ReqRes* !'});
            break;
        default:
            res.status(406).end();
    }
});
//Per GET kann man auf die Datei data zugreifen
app.get('/data', function(req, res){
    res.status(200).json(data);
});
//Erweitert mit pathparams ('http://localhost:1337/data/title')
app.get('/data/:title', jsonParser, function(req,res){
    var title = req.params.title;
    console.log("Requested title is: "+title);
    
    var filt = data.filter(function(value, index, arr){
        return value.title == title;
    });
    
    if (filt.length >= 1) {
        res.status(200).json(filt);
    } else {
        res.status(404).end();
    }
});
//Per POST kann an die JSON-Datei data ein neues Objekt angehangen werden
app.post('/data', jsonParser, function(req, res){
    data.push(req.body);
    res.type('plain').send('Added!');
});

//Gibt den Port an auf dem der Server auf Requests wartet
app.listen(1337);