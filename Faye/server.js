//Module einbinden
var http = require('http');
var faye = require('faye');

//Server erstellen
var server = http.createServer();

//faye-Adapter konfigurieren
var bayeux = new faye.NodeAdapter({
    mount: '/faye',
    timeout: 45
});

//faye an den Server binden
bayeux.attach(server);

//Serverseitiger Client erstellen
//var client = new faye.Client('http://localhost:3000/faye');

//var subscription = client.subscribe('/news', function(message) {
	//console.log("Neue Nachricht von " message.autor + ": " message.text);

//Server starten
server.listen(3000, function() {
	console.log("Server listens on Port 3000.");
});