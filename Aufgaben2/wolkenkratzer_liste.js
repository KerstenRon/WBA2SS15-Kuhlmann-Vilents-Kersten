var fs = require('fs');
var chalk = require('chalk'); //npm install --save chalk ("muss vorher installiert werden!")

var file = __dirname + '/wolkenkratzer.json';

fs.readFile(file, function (err, data) {
    if(err) {
        console.log("Error:" + err);
        return;
    }
        
    var data = JSON.parse(data);
    var i;    
    for( i = 0; i < data.wolkenkratzer.length; i++) {
        console.log(chalk.blue("N") + chalk.red("a") + chalk.green("m") + chalk.yellow("e: ") + chalk.magenta(data.wolkenkratzer[i].name) + "\n" + chalk.red("St") + chalk.green("a") +  chalk.yellow("d") + chalk.blue("t: ") + chalk.magenta(data.wolkenkratzer[i].stadt) + "\n" + chalk.green("H") + chalk.yellow("ö") + chalk.blue("h") + chalk.red("e: ") + chalk.magenta(data.wolkenkratzer[i].hoehe) + chalk.cyan("\n----------------------------------"));
    }
});

//var data = __dirname + '/my.json';


//fs.writeFile(data, JSON.stringify(file, null, 4), function(err){
    //if(err){
        //console.log('Error:' + err);
        //return;
   // } 
    //else {
    //    console.log('It\'s saved!');
   // }
//});
