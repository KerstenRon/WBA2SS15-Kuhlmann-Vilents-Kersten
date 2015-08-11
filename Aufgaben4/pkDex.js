//Einbindung der Module und Erstellung von Instanzen
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var app = express();
var pkDex;
var pkTeam;
var data;
var save;
var i = 0;
var fs = require('fs');
var content;

//File-Array mit Paths der externen Dateien zur persistenten Speicherung von Daten
var datax = new Array();
datax[0] = __dirname + '/pkDexGen1.json';
datax[1] = __dirname + '/pkTeam.json';
datax[2] = __dirname + '/pkUser.json';

//Externe Datei 'pkDexGen1.json' einlesen
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

//Externe Datei 'pkTeam.json' einlesen
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

//Externe Datei 'pkUser.json' einlesen
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
/*-----GET-----*/
//Startseite
app.get('/', function(req, res) { 
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

//Liste aller pkTeams anfordern
app.get('/pkTeam', function(req, res) {
    var length = Object.keys(pkTeam).length;
    for (var j = 0; j < length; j++) {
            console.log(pkTeam[j])  
    }
    res.status(200).json(pkTeam);
});

//Liste aller Pokemón im pkDexGen1 anfordern
app.get('/pkDex', function(req, res) {
    var length = Object.keys(pkDex).length;
    for (var j = 0; j < length; j++) {
            console.log(pkDex[j]);  
    }
    res.status(200).json(pkDex);
});

//Liste aller pkUser anfordern
app.get('/pkUser', function(req, res) {
    var length = Object.keys(pkUser).length;
    for (var j = 0; j < length; j++) {
            console.log(pkUser[j]);
    }
    res.status(200).json(pkUser);
});


<<<<<<< HEAD
//Team des Users mit seiner Signatur (sign) anfordern
=======
//Sign anfordern
>>>>>>> 008c7b0db5f5f37950f8f71c0414fe032d065fc1
app.get('/pkTeam/:sign', jsonParser, function(req, res){
    var sign = req.params.sign;
    var length = Object.keys(pkTeam).length;
    var team;
    var i = 0;
    if(team !== sign){
        while(i<length){
            var teamsign = pkTeam[i].team[0].sign;
<<<<<<< HEAD
=======
            //var mem1 = pkTeam[i].team[1].mem;
            //index aus pkTeam mit Daten aus pkDex tauschen...noch nicht funktionsfähig!
            /*for(var j = 0; j<Object.keys(pkDex).length ; j++){
                if ( mem1 === pkDex[j].pkm[0].index){
                    mem1 = pkDex[j];
                }
            }
            console.log(mem1);*/
>>>>>>> 008c7b0db5f5f37950f8f71c0414fe032d065fc1
            var mem1 = pkTeam[i].team[1].mem;
            var mem2 = pkTeam[i].team[2].mem;
            var mem3 = pkTeam[i].team[3].mem;
            var mem4 = pkTeam[i].team[4].mem;
            var mem5 = pkTeam[i].team[5].mem;
            var mem6 = pkTeam[i].team[6].mem;
            var teamset = "Trainersignatur: " + teamsign + ", Teammitglied 1: " + mem1 + ", Teammitglied 2: " + mem2 + ", Teammitglied 3: " + mem3 + ", Teammitglied 4: " + mem4 + ", Teammitglied 5: " + mem5 + ", Teammitglied 6: " + mem6 ;
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

<<<<<<< HEAD
//Anfordern der Unterressourcen pkDex/:prm von pkDexGen1  
=======
//Anfordern der Unterressourcen pkDex/:prm von pkDexGen1 
//pathparams 
>>>>>>> 008c7b0db5f5f37950f8f71c0414fe032d065fc1
app.get('/pkDex/:prm', function(req, res){
    var prm = req.params.prm;
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

//Anfordern der Unterressourcen pKUser/:prm von pkUser 
<<<<<<< HEAD
=======
//pathparams 
>>>>>>> 008c7b0db5f5f37950f8f71c0414fe032d065fc1
app.get('/pkUser/:prm', function(req, res){
    var prm = req.params.prm;
    var length = Object.keys(pkUser).length;
    var usr;
    var i = 0;
    if(usr !== prm){
        while (i<length){
            var usrid = pkUser[i].user[0].sign;
            var usrname = pkUser[i].user[1].name;
            var usratr = pkUser[i].user[2].atr;
            var usrset = "Id: " + usrid + ", Name: " + usrname + ", Atr: " + usratr
            if(usrid === prm){
                i = length;
                res.status(200).json(usrset);
            } else if(usrname === prm){
                i = length;
                res.status(200).json(usrset);
            } else if(usratr === prm){
                i = length;
                res.status(200).json(usrset);
            } else {
                i++;
            }
        }
            res.status(404).end();
    }
});

/*-----POST-----*/
<<<<<<< HEAD
//Wird nich benötigt
=======

>>>>>>> 008c7b0db5f5f37950f8f71c0414fe032d065fc1
//Anlegen eines neuen Pokémon
//Syntax
//{"pkm":[{"id":"xxx","name":"string","typ1":"string","typ2":"string","des":"string"}]}
app.post('/pkDex', jsonParser, function(req, res){
    pkDex.push(req.body);
    res.type('plain').send('Pkm erfolgreich gesetzt.');
<<<<<<< HEAD
    
        data = datax[0]
    
=======
    i = 0;
    if( i !== 0){
        data = datax[0]
    } else {
        data = datax[1]
    }
>>>>>>> 008c7b0db5f5f37950f8f71c0414fe032d065fc1
    save = JSON.stringify({pkdexGen1:pkDex});
    fs.writeFile(data, save, function(err){
        if(err){
            return console.log(err);
        } 
    });
});

//Anlegen eines persönlichen pkTeams 
//Syntax
//{"team":[{"index":"x", "team":[{"mem1":"yyy"},...,{"mem6":"yyy"}]}
app.post('/pkTeam', jsonParser, function(req, res){
    pkTeam.push(req.body);
    res.type('plain').send('PkTeam erfolgreich gesetzt.');
    
        data = datax[1]
    
    save = JSON.stringify({pkTeam:pkTeam});
    fs.writeFile(data, save, function(err){
        if(err){
            return console.log(err);
        } 
    });
});

//Anlegen eines neuen Users
//Syntax
//{"user":[{"Nik":"xxx"}, {"name":"String"}, {"atr":"String"}]}
app.post('/pkUser', jsonParser, function(req, res){
    pkUser.push(req.body);
    res.type('plain').send('pkUser erfolgreich gesetzt.');
    
        data = datax[2]
        
    save = JSON.stringify({pkUser:pkUser});
    fs.writeFile(data, save, function(err){
        if(err){
            return console.log(err);
        } 
    });
});

/*-----PUT-----*/

//Ändern einer pkUser-Ressource
//Geändert von Ron am 11.08.2015 von 9:34Uhr - 12:07Uhr EZ!!
app.put('/pkUser/:prm', jsonParser, function(req, res){
    var prm = req.params.prm;
    var length = Object.keys(pkUser).length;
    var i = 0;
    var usr;
    data = datax[2];
    console.log("Hier: "+ req.body.user[0].sign + req.body.user[1].name + req.body.user[2].atr);
    if(usr !== prm){
        while (i<length){
            var usrid = pkUser[i].user[0].sign;
            var usrname = pkUser[i].user[1].name;
            var usratr = pkUser[i].user[2].atr;
            var usrset = "message" + ":" + "Der User wurde erfolgreich bearbeitet." 
            if(usrid === prm){
                //Aktualisierung findet HIER statt!
                pkUser[i].user[0].sign = req.body.user[0].sign;
                pkUser[i].user[1].name = req.body.user[1].name;
                pkUser[i].user[2].atr = req.body.user[2].atr;
                //Aktualisierung wird HIER gespeichert!
                save = JSON.stringify({pkUser:pkUser});       
                fs.writeFile(data, save, function(err){
                    if(err){
                        return console.log(err);
                    } 
                });
                //ENDE der while-Schleife i=Länge.Objekt Objekt=pkUser.json
                i = length;
                //Client erhält Response Daten wurden erfolgreich(200) bearbeitet!
                res.status(200).json(usrset);
            } else if(usrname === prm){
                //Aktualisierung findet HIER statt!
                pkUser[i].user[0].sign = req.body.user[0].sign;
                pkUser[i].user[1].name = req.body.user[1].name;
                pkUser[i].user[2].atr = req.body.user[2].atr;
                //Aktualisierung wird HIER gespeichert!
                save = JSON.stringify({pkUser:pkUser});
                fs.writeFile(data, save, function(err){
                    if(err){
                        return console.log(err);
                    } 
                });
                //ENDE der while-Schleife i=Länge.Objekt Objekt=pkUser.json
                i = length;
                //Client erhält Response Daten wurden erfolgreich(200) bearbeitet!
                res.status(200).json(usrset);
            } else if(usratr === prm){
                //Aktualisierung findet HIER statt!
                pkUser[i].user[0].sign = req.body.user[0].sign;
                pkUser[i].user[1].name = req.body.user[1].name;
                pkUser[i].user[2].atr = req.body.user[2].atr;
                //Aktualisierung wird HIER gespeichert!
                save = JSON.stringify({pkUser:pkUser});
                fs.writeFile(data, save, function(err){
                    if(err){
                        return console.log(err);
                    } 
                });
                //ENDE der while-Schleife i=Länge.Objekt Objekt=pkUser.json
                i = length;
                //Client erhält Response Daten wurden erfolgreich(200) bearbeitet!
                res.status(200).json(usrset);
            } else {
                i++;
            }
        }
        //Client erhält Response Daten wurden nicht gefunden(404)
        res.status(404).end("User wurde nicht gefunden.");
    }
<<<<<<< HEAD
});

//Ändern einer pkTeam-Ressource
app.put('/pkTeam/:sign', jsonParser, function(req, res){
    for(prm in req.body){
        data[prm] = req.body[prm];
    }
=======
>>>>>>> 008c7b0db5f5f37950f8f71c0414fe032d065fc1
    save = JSON.stringify({pkTeam:pkTeam});
    fs.writeFile(data, save, function(err){
        if(err){
            return console.log(err);
        }
    });
});

<<<<<<< HEAD
=======
//Anlegen eines neuen Users
//Syntax
//{"user":[{"Nik":"xxx"}, {"name":"String"}, {"atr":"String"}]}
app.post('/pkUser', jsonParser, function(req, res){
    pkUser.push(req.body);
    res.type('plain').send('pkUser erfolgreich gesetzt.');
    i = 1;
    if( i !== 1){
        data = datax[0]
    } else {
        data = datax[1]
    }
    save = JSON.stringify({pkUser:pkUser});
    fs.writeFile(data, save, function(err){
        if(err){
            return console.log(err);
        } 
    });
});

/*-----PUT-----*/

//Ändern einer pkUser-Ressource
app.put('/pkUser/:sign', jsonParser, function(req, res){
    for(prm in req.body){
        data[prm] = req.body[prm];
    }
    save = JSON.stringify({pkUser:pkUser});
    fs.writeFile(data, save, function(err){
        if(err){
            return console.log(err);
        }
    });
});

//Ändern einer pkTeam-Ressource
app.put('/pkTeam/:sign', jsonParser, function(req, res){
    for(prm in req.body){
        data[prm] = req.body[prm];
    }
    save = JSON.stringify({pkTeam:pkTeam});
    fs.writeFile(data, save, function(err){
        if(err){
            return console.log(err);
        }
    });
});

>>>>>>> 008c7b0db5f5f37950f8f71c0414fe032d065fc1
/*-----DELETE-----*/

//Löschen einer pkUser-Ressource
app.delete('/pkUser', jsonParser, function(req, res){
    fs.unlinkSync(req.body);
    console.log("Gelöscht");
});
    
    
    
//Server erwartet req über Port 1337
app.listen(1337);