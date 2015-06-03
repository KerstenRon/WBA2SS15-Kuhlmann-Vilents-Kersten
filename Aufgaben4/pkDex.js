//Das ist unser "PkDex"
//Einbinden der Module und erstellen von Instanzen
<<<<<<< HEAD
=======
var http = require('http');
>>>>>>> 367802dbff8545d22b601c365c4204228d356dd5
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();

<<<<<<< HEAD
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
=======
//File-Array in dem der Path aller Dateien gelistet sind.
var pkDex;
var pkTeam;
var data;
var save;
var i = 0;
var datax = new Array();
datax[0] = __dirname + '/pkdexGen1.json';
datax[1] = __dirname + '/pkTeam.json';

//Externe JSON-Dateien mit Node.js | FileSystem('fs') einlesen, damit man diese außerhalb der Serverimplementierung verwalten.
var fs = require('fs');
var content;

function readContent(callback) {
    fs.readFile(datax[0], function (err, data) {
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

//pkTeam JSON einlesen
function readContent2(callback) {
    fs.readFile(datax[1], function (err, data) {
        if(err) {
            return callback(err);
        }
        var data = JSON.parse(data);
        callback(null, data);
    });
};

readContent2(function (err, content) {
    pkTeam=content.pkTeam;
});
>>>>>>> 367802dbff8545d22b601c365c4204228d356dd5

//GET auf die Indexseite
app.get('/', function(req, res) {
    //res.send('Willkommen in deinem persönlichen PkDex!');
    
<<<<<<< HEAD
//Der Client kann sich jetzt aussuchen welchen Datentyp zurückgegeben werden soll (Hier auswahl zwischen den Accepttypes: 'html' und 'json')
//Wird der Datentyp nicht akzeptiert wird der Fehlercode '406' zurückgegeben ('resource ... cannot be provided in a format specified in the Accept headers ...') 
=======
//Der Client kann sich jetzt aussuchen welchen Datentyp zurückgegeben werden soll (Hier auswahl zwischen den Accepttypes: 'html' und 'json').
//Wird der Datentyp nicht akzeptiert wird der Fehlercode '406' zurückgegeben ('resource ... cannot be provided in a format specified in the Accept headers ...'). 
>>>>>>> 367802dbff8545d22b601c365c4204228d356dd5
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

<<<<<<< HEAD
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
=======
//Per GET kann man auf die Datei '/pkTeam' zugreifen.
//app.get('/pkTeam', function(req, res){
//    res.status(200).json(pkTeam);
//});

app.get('/pkTeam', function(req, res) {
    var length = Object.keys(pkTeam).length;
    console.log(length);
    for (var j = 0; j < length; j++) {
            console.log(pkTeam[j]);
        
    }
    res.status(200).json(pkTeam);
});

//Per GET wird auf eine beliebige 'id' in der JSON 'pkDex' zugegriffen sollte ein Fehler auftreten (z.B.: id nicht vorhanden) wird der Statuscode '404' ausgegeben.
app.get('/pkTeam/:index', jsonParser, function(req, res){
    var index = req.params.index;
    console.log("Die Angeforderte Team ist: Team"+index);
    
    var filt = pkTeam.filter(function(value, i, arr){
        //var v = 'mem'+1;
        //console.log(typeof(v));
        //console.log(pkTeam[0].team[0].v);
        return value.index == index;
>>>>>>> 367802dbff8545d22b601c365c4204228d356dd5
    });
    
    if (filt.length >= 1) {
        res.status(200).json(filt);
    } else {
        res.status(404).end();
    }
});

<<<<<<< HEAD
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

=======
//Per GET kann man auf die Datei '/pkDex' zugreifen, sowie nach queryparams filtern.
app.get('/pkDex', function(req, res) {
    
    if (req.query.index !== undefined) {
        res.json(pkDex.filter(function(prm, i, arr) {
            return prm.index == req.query.index
        }));   
    } else if (req.query.name !== undefined) {
        res.json(pkDex.filter(function(prm, i, arr) {
            return prm.name == req.query.name 
        })); 
    } else if (req.query.typ1 !== undefined) {
        res.json(pkDex.filter(function(prm, i, arr) {
            return prm.typ1 == req.query.typ1 
        })); 
    } else if (req.query.typ2 !== undefined) {
        res.json(pkDex.filter(function(prm, i, arr) {
            return prm.typ2 == req.query.typ2 
        }));
    } else if (req.query.bes !== undefined) {
        res.json(pkDex.filter(function(prm, i, arr) {
            return prm.bes == req.query.bes
        }));
    }
    
    else {
        res.json(pkDex);
        console.log(pkDex);
    }
});

//Per POST können neue Objekte(Einträge) an die JSON 'pkDex' angehangen werden. Dabei sollte die Syntax...
    //{"id":"xxx","name":"string","typ1":"string","typ2":"string","des":"string"}...beachtet werden.
app.post('/pkDex', jsonParser, function(req, res){
    pkDex.push(req.body);
    res.type('plain').send('Added!');
//Das persistente Speichern soll durch die Node.js Methode 'fs.writeFile()' des 'File System' Moduls erfolgen.
    i = 0;
    if( i !== 0){
        data = datax[0]
    } else {
        data = datax[1]
    }

    save = JSON.stringify({pkdexGen1:pkDex});
    fs.writeFile(data, save, function(err){
        if(err){
            return console.log(err);
        } 
    });
});

//Anlegen eines persönlichen Pkteams in pkTeam
//Syntax...
//{"index":"x", "team":[{"mem1":"yyy"},...,{"mem6":"yyy"}]}
app.post('/pkTeam', jsonParser, function(req, res){
    pkTeam.push(req.body);
    res.type('plain').send('PkTeam erfolgreich gesetzt.');
    i = 1;
    if( i !== 1){
        data = datax[0]
    } else {
        data = datax[1]
    }

    save = JSON.stringify({pkTeam:pkTeam});
    fs.writeFile(data, save, function(err){
        if(err){
            return console.log(err);
        } 
    });
});
>>>>>>> 367802dbff8545d22b601c365c4204228d356dd5
//Server erwartet req über Port 1337
app.listen(1337);