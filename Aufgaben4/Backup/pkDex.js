//Das ist unser "PkDex"
//Einbinden der Module und erstellen von Instanzen
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();

//File-Array in dem der Path aller Dateien gelistet sind.
var pkDex;
var pkTeam;
var data;
var save;
var i = 0;
var datax = new Array();
datax[0] = __dirname + '/pkDexGen1.json';
datax[1] = __dirname + '/pkTeam.json';
datax[2] = __dirname + '/pkUser.json';

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
    pkDex=content.pkDexGen1;
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
//pkUser JSON einlesen
function readContent3(callback) {
    fs.readFile(datax[2], function (err, data) {
        if(err) {
            return callback(err);
        }
        var data = JSON.parse(data);
        callback(null, data);
    });
};

readContent3(function (err, content) {
    pkUser=content.pkUser;
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

//Per GET kann man auf die Datei '/pkTeam' zugreifen.
//app.get('/pkTeam', function(req, res){
//    res.status(200).json(pkTeam);
//});

app.get('/pkTeam', function(req, res) {
    var length = Object.keys(pkTeam).length;
    for (var j = 0; j < length; j++) {
            console.log(pkTeam[j])  
    }
    res.status(200).json(pkTeam);
});

//Per GET kann man auf die Datei '/pkTeam' zugreifen.
//app.get('/pkTeam', function(req, res){
//    res.status(200).json(pkTeam);
//});

app.get('/pkDex', function(req, res) {
    var length = Object.keys(pkDex).length;
    for (var j = 0; j < length; j++) {
            console.log(pkDex[j]);  
    }
    res.status(200).json(pkDex);
});

app.get('/pkUser', function(req, res) {
    var length = Object.keys(pkUser).length;
    for (var j = 0; j < length; j++) {
            console.log(pkUser[j]);
    }
    res.status(200).json(pkUser);
});

//Per GET wird auf eine beliebige 'sign' in der JSON 'pkTeam' zugegriffen sollte ein Fehler auftreten (z.B.: id nicht vorhanden) wird der Statuscode '404' ausgegeben.
app.get('/pkTeam/team/:sign', jsonParser, function(req, res){
    var sign = req.params.sign;
    console.log("Das Angeforderte Team von User: "+sign);
    
    var length = Object.keys(pkTeam).length;
    var team;
    var i = 0;
    if(team!==sign){
        while(i<length){
            var teamsign = pkTeam[i].team[0].sign;
            var mem1 = pkTeam[i].team[1].mem;
            //index aus pkTeam mit Daten aus pkDex tauschen...noch nicht funktionsfähig!
            /*for(var j = 0; j<Object.keys(pkDex).length ; j++){
                if ( mem1 === pkDex[j].pkm[0].index){
                    mem1 = pkDex[j];
                }
                
            }
            console.log(mem1);*/
            var mem2 = pkTeam[i].team[2].mem;
            var mem3 = pkTeam[i].team[3].mem;
            var mem4 = pkTeam[i].team[4].mem;
            var mem5 = pkTeam[i].team[5].mem;
            var mem6 = pkTeam[i].team[6].mem;
            var teamset = "Trainersignatur: " + teamsign + ", Teammitglied 1: " + mem1 + ", Teammitglied 2: " + mem2 + ", Teammitglied 3: " + mem3 + ", Teammitglied 4: " + mem4 + ", Teammitglied 5: " + mem5 + ", Teammitglied 6: " + mem6 ;
            //prüfen ob User mehrere Teams hat und diese in ausgabe speichern und ausgeben!
            /*var teamarr = new Array();
            teamarr[i] = teamset;
            for(var x = 0; x < teamarr.length; x++){
                console.log(teamarr[x]);
            }
            var ausgabe = teamarr[i++];*/
            if(teamsign === sign){
                i = length;
                res.status(200).json(teamset);
            } else {
                i++;
            }
        }
    }
        res.status(404).end();
    
});

//Per GET kann man auf die Datei '/pkDex/pkm/:name' zugreifen, sowie nach pathparams suchen.
app.get('/pkDex/pkm/:prm', function(req, res){
    var prm = req.params.prm;
    console.log("Das Angeforderte Pkm heisst: "+prm);
    var length = Object.keys(pkDex).length;
    var pkm;
    var i = 0;
    if(pkm !== prm){
        while (i<length){
            var pkid = pkDex[i].pkm[0].index;
            var pkname = pkDex[i].pkm[1].name;
            var pktyp1 = pkDex[i].pkm[2].typ1;
            var pktyp2 = pkDex[i].pkm[3].typ2;
            var pkbes = pkDex[i].pkm[4].bes;
            var pkset = "Index: " + pkid + ", Name: " + pkname + ", Typ1: " + pktyp1 + ", Typ2: " + pktyp2 + ", Beschreibung: " + pkbes 
            if(pkid === prm){
                i = length;
                res.status(200).json(pkset);
            } else if(pkname === prm){
                i = length;
                res.status(200).json(pkset);
            } else if(pktyp1 === prm){
                i = length;
                res.status(200).json(pkset);
            } else if(pktyp2 === prm){
                i = length;
                res.status(200).json(pkset);
            } else if(pkbes === prm){
                i = length;
                res.status(200).json(pkset);
            } else {
                i++;
            }
        }
            res.status(404).end();
    }
});
//Query-Params sind auskommentiert da diese nicht dem REST-Prinzip entsprechen! ;C
/*app.get('/pkDex', function(req, res) {
    
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
});*/

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
//Server erwartet req über Port 1337
app.listen(1337);