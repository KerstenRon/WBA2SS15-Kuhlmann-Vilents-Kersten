//Module einbinden
var http = require('http');
var faye = require('faye');
var express = require('express');
var bodyParser = require('body-parser');

//Server erstellen
var app = express();
var server = http.createServer(app);
app.use(bodyParser.json());

//faye-Adapter konfigurieren
var bayeux = new faye.NodeAdapter({
    mount: '/faye'
});

//faye an den Server binden
bayeux.attach(server);

//Serverseitiger Client erstellen
var client = new faye.Client("http://localhost:3000/faye");

var subscription = client.subscribe('/news', function (message) {
	console.log("Neue Nachricht von " + message.author + ": " + message.content);
});

//Serverseitiger Publish
//news als Ressource
app.post('/news', function(req, res) {
	//Nachricht an /news publishen
	var publication = client.publish('/news', {
          "author": req.author,
          "content": req.content
    });

    //promise-Objekt von publication mit Handlern versehen
    publication.then {
    	
        function () {
    	  console.log("Nachricht erfolgreich gesendet.");
          res.writeHead(200, "OK");
          res.write("Nachricht wurde gesendet.");
          res.end();
          },
        function (error) {
          console.log("Nachricht nicht gesendet.");
          res.write("Nachricht wurde nicht gesendet");
          next(error)
        };
    };
});

//Server starten
server.listen(3000, function() {
	console.log("Server listens on Port 3000.");
});