var fs = require('fs');
var file = __dirname + '/wolkenkratzer.json';
 

fs.readFile(file, {encoding: 'utf8'}, function (err, data) {
    if(err) {
        console.log('Error:' + err);
        
        return;
    }
        data = JSON.stringify(data);
        data = JSON.parse(data);
    console.log(data);
});

/*fs.writeFile(file, data, function(err){
    if(err){
        console.log('Error:' + err);
        
        return;
    }
        console.log('It\'s saved!');
});**/

function wolkenkratzer_liste() {
    fs.readFile();
}