var fs = require('fs');
var file = __dirname + '/wolkenkratzer.json';

fs.readFile(file, function (err, data) {
    if(err) {
        console.log("Error:" + err);
        return;
    }
        
    var data = JSON.parse(data);
    var i;    
    for( i = 0; i < data.wolkenkratzer.length; i++) {
        console.log("Name: " + data.wolkenkratzer[i].name + "\n" + "Stadt: " + data.wolkenkratzer[i].stadt + "\n" + "Hoehe: " + data.wolkenkratzer[i].hoehe + "\n----------------------------------");
    }
});

var data = __dirname + '/my.json';


fs.writeFile(data, JSON.stringify(file, null, 4), function(err){
    if(err){
        console.log('Error:' + err);
        return;
    } 
    else {
        console.log('It\'s saved!');
    }
});
