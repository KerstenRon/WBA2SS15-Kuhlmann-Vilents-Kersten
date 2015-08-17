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

app.set('view engine', 'ejs');
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

<<<<<<< HEAD
//Per GET kann man auf die Datei '/pkTeam' zugreifen.
app.get('/pkTeam', function(req, res){
    res.status(200).json(pkTeam);
});

//Per GET wird auf eine beliebige 'id' in der JSON 'pkDex' zugegriffen sollte ein Fehler auftreten (z.B.: id nicht vorhanden) wird der Statuscode '404' ausgegeben.
app.get('/pkDex/:index', jsonParser, function(req, res){
    var index = req.params.index;
    console.log("Die Angeforderte id ist: "+index);
    
    var filt = pkDex.filter(function(value, i, arr){
        return value.index == index;
    });
=======
//Liste aller pkTeams anfordern
app.get('/pkTeam', function(req, res) {
    
    res.status(200).json(pkTeam);
});

//Liste aller Pokemón im pkDexGen1 anfordern
app.get('/pkDex', function(req, res) {
    
    res.status(200).json(pkDex);
});

//Liste aller pkUser anfordern
app.get('/pkUser', function(req, res) {
>>>>>>> master
    
    res.status(200).json(pkUser);
});


//Team des Users mit seiner Signatur (sign) anfordern
app.get('/pkTeam/:sign', jsonParser, function(req, res){
    var sign = req.params.sign;
    var length = Object.keys(pkTeam).length;
    var team;
    var i = 0;
    if(team !== sign){
        while(i<length){
            var teamsign = pkTeam[i].team[0].sign;
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

//Anfordern der Unterressourcen pkDex/:prm von pkDexGen1  
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
<<<<<<< HEAD
    
    else {
        res.json(pkDex);
        console.log(pkDex + "Der gesuchte Index ist NICHT vorhanden.");
    }
});

//Per POST können neue Objekte(Einträge) an die JSON 'pkDex' angehangen werden. Dabei sollte die Syntax...
    //{"id":"xxx",
    // "name":"string",
    // "typ1":"string",
    // "typ2":"string",
    // "des":"string"}
//...beachtet werden.
=======
});

//Anfordern der Unterressourcen pKUser/:prm von pkUser 
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
//Wird nich benötigt
//Anlegen eines neuen Pokémon
//Syntax
//{"pkm":[{"id":"xxx","name":"string","typ1":"string","typ2":"string","des":"string"}]}
>>>>>>> master
app.post('/pkDex', jsonParser, function(req, res){
    pkDex.push(req.body);
    res.type('plain').send('Pkm erfolgreich gesetzt.');
    
        data = datax[0]
    
    save = JSON.stringify({pkdexGen1:pkDex});
    fs.writeFile(data, save, function(err){
        if(err){
            return console.log(err);
        } 
    });
});

<<<<<<< HEAD
//Anlegen eines persönlichen Pkteams in pkTeam
=======
//Anlegen eines persönlichen pkTeams 
//Syntax
//{"team":[{"index":"x", "team":[{"mem1":"yyy"},...,{"mem6":"yyy"}]}
//Verbessert von Ron am 11.08.2015 von 12:28Uhr - 14:17Uhr
>>>>>>> master
app.post('/pkTeam', jsonParser, function(req, res){
    var t = 0;
    var length = Object.keys(pkTeam).length;
    var bool = false;
    
    while (t<length){
        var newsign = req.body.team[0].sign;
        var sign=pkTeam[t].team[0].sign;
        if(newsign !== sign){
            bool = true;
            t++;
        } else {
            bool = false;
            t=length;
        }
    }
        if(bool){
            pkTeam.push(req.body);
            data = datax[1];
            
            save = JSON.stringify({pkTeam:pkTeam});
            fs.writeFile(data, save, function(err){
                if(err){
                    return console.log(err);
                } 
            });
            t=length;
            res.type('plain').send('PkTeam erfolgreich gesetzt.');
        } else {
            res.type('plain').send('Der Trainer: ' + newsign + ' besitzt schon ein pkTeam');
        }
    res.status(500).end('Das Team konnte nicht gesetzt werden');
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

<<<<<<< HEAD
//Mittels GET wird eine globale Statistik aufgerufen, welche die drei meistgenutzten Pkmn in allen gespeicherten Pkteams zeigt.
app.get('/pkTeam', function(req, res){
    //int a,b,c
    //Erzeuge leeres Array von der Größe des Dex
    //for-Schleife Pkteams
        //for-Schleife Pkmn in PkTeams
            //copy[id]++; index++;
    //forschleife i = 0; i < 3
        //forschleife copy-Array
            //if(i == 0)
                //if(copy[i] > copy[i+1]) a = copy[i];
            //elseif(i == 1)
                //if(copy[i] > copy[i+1] && copy[i] < a) b = copy[i];
            //else
                //if(copy[i] > copy[i+1] && copy[i] < b) c = copy[i];
    //Rückgabewerte: pkDex[a], pkDex[b] und pkDex[c]
});
    

=======
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
});

//Ändern einer pkTeam-Ressource
app.put('/pkTeam/:sign', jsonParser, function(req, res){
    var sign = req.params.sign;
    var length = Object.keys(pkTeam).length;
    var team;
    var i = 0;
    if(team !== sign){
        while(i<length){
            var teamsign = pkTeam[i].team[0].sign;
            if(teamsign === sign){
            pkTeam[i].team[1].mem = req.body.team[1].mem
            pkTeam[i].team[2].mem = req.body.team[2].mem
            pkTeam[i].team[3].mem = req.body.team[3].mem
            pkTeam[i].team[4].mem = req.body.team[4].mem
            pkTeam[i].team[5].mem = req.body.team[5].mem
            pkTeam[i].team[6].mem = req.body.team[6].mem
                i = length;
                res.status(200).json("Das Team wurde erfolgreich angepasst");
            } else {
                i++;
            }
        }
    }
        res.status(404).end("Das PkTeam mit der Signatur: "+ sign + " konnte nicht gefunden werden.");    
});

/*-----DELETE-----*/

//Löschen einer pkUser-Ressource
//Verbessert von Ron am 11.08.2015 von 14:17Uhr - 15:22Uhr
app.delete('/pkUser/:sign', jsonParser, function(req, res){
    var sign = req.params.sign;
    var length = Object.keys(pkUser).length;
    var i = 0;
    var bool = false;
    var data = datax[2];
    var key;
    
        while(i<length){
            var usrsign = pkUser[i].user[0].sign;
            console.log(usrsign);
            if(usrsign === sign){
                bool = true;
                key = i;
                i=length;     
            } else {
                bool = false;
                i++;
            }
        }
        if(bool){
            console.log(pkUser[key]);
            pkUser[key] = null;
            delete pkUser[key];
            
            save = JSON.stringify({pkUser:pkUser});
            fs.writeFile(data, save, function(err){
                if(err){
                    return console.log(err);
                } 
            });
            i=length;
            res.type('plain').send('Der User wurde erfolgreich gelöscht.');
        } else {
            res.type('plain').send('Der User ' + sign + ' existiert nicht');
        }
    res.status(404).end("Der pkUser" + sign + "konnte nicht gelöscht werden.");
});
    
    
    
>>>>>>> master
//Server erwartet req über Port 1337
app.listen(3000, function(){
    console.log("Server listens on Port 3000");
})
