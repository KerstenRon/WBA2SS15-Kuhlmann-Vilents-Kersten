//Das ist unser "PkDex"
//Einbinden der Module und erstellen von Instanzen
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();

//Externe JSON-Dateien einlesen, damit man diese nicht mehr in der Serverimplementierung einfügen muss (funktioniert nicht!)
//var content;
//function readContent(callback) {
//fs.readFile(file, function (err, data) {
//    if(err) {
//       return callback(err);
//    }
//        
//    var data = JSON.parse(data);
//    var data = data.pkdexGen1;
//    callback(null, data);
//});
//};

//readContent(function (err, content) {
//console.log(content);
//});

//Das ist die zu verwendende JSON 'pkDex'
var pkDex = [{"id":"001",
                "name":"Bisasam",
                "typ1":"Pflanze",
                "typ2":"Gift",
                "des":"Zwiebelkröte"},
               {"id":"002",
                "name":"Bisaknosp",
                "typ1":"Pflanze",
                "typ2":"Gift",
                "des":"Knospenkröte"},
               {"id":"003",
                "name":"Bisaflor",
                "typ1":"Pflanze",
                "typ2":"Gift",
                "des":"Ultra-BADASS-Kröte"},
               {"id":"004",
                "name":"Glumanda",
                "typ1":"Feuer",
                "typ2":"",
                "des":"Feuerechse"},
               {"id":"005",
                "name":"Glutexo",
                "typ1":"Feuer",
                "typ2":"",
                "des":"Feuerraptor"},
               {"id":"006",
                "name":"Glurak",
                "typ1":"Feuer",
                "typ2":"",
                "des":"Feuerdrache"},
               {"id":"007",
                "name":"Schiggi",
                "typ1":"Wasser",
                "typ2":"",
                "des":"Slowmo-Schildkröte"},
               {"id":"008",
                "name":"Schillog",
                "typ1":"Wasser",
                "typ2":"",
                "des":"Babokröte"},
               {"id":"009",
                "name":"Turtok",
                "typ1":"Wasser",
                "typ2":"",
                "des":"Tankkröte"}
              ]

//GET auf die Indexseite
app.get('/', function(req, res) {
    //res.send('Willkommen in deinem persönlichen PkDex!');
    
//Der Client kann sich jetzt aussuchen welchen Datentyp zurückgegeben werden soll (Hier auswahl zwischen den Accepttypes: 'html' und 'json')
//Wird der Datentyp nicht akzeptiert wird der Fehlercode '406' zurückgegeben ('resource ... cannot be provided in a format specified in the Accept headers ...') 
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
//Per GET wird auf eine beliebige 'id' in der JSON 'pkDex' zugegriffen sollte ein Fehler auftreten (z.B.: id nicht vorhanden) wird der Statuscode '404' ausgegeben.
app.get('/pkDex/:id', jsonParser, function(req, res){
    var id = req.param.id;
    console.log('Requested id is: '+id);
    
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
    //{"id":"xxx",
    // "name":"string",
    // "typ1":"string",
    // "typ2":"string",
    // "des":"string"}
//...beachtet werden.
app.post('/pkDex', jsonParser, function(req, res){
    content.push(req.body);
    res.type('plain').send('Added!');
});

//Server erwartet req über Port 1337
app.listen(1337);