var fs = require('fs');
var file = __dirname + '/wolkenkratzer.json';
var chalk = require('chalk');
var sortiertes_array = [];
var wolkenkratzer_sortiert;
fs.readFile(file, function (err, data) {
    if(err) return console.log(err);
    data = JSON.parse(data.toString()); 
    console.log(chalk.yellow("\nWolkenkratzer wurden eingelesen!\n")); //dient nur der Orientierung 
    sortiertes_array = data.wolkenkratzer.sort(function (a, b) {
        if (b.hoehe > a.hoehe) return 1;
        if (b.hoehe < a.hoehe) return -1;
        return 0;
    });
    console.log(chalk.yellow("\nWolkenkratzer wurden sortiert!\n")); //dient nur der Orientierung 
    wolkenkratzer_sortiert = JSON.stringify({wolkenkratzer: sortiertes_array});
    fs.writeFile(__dirname + "/wolkenkratzer_sortiert.json", wolkenkratzer_sortiert, function(err) {
        if(err) return console.log(err);
        console.log(chalk.yellow("\nDatei 'wolkenkratzer_sortiert' wurde erstellt!\n")); 
        for(var i = 0; i < data.wolkenkratzer.length; i++) {
            console.log("Name: " + chalk.blue(data.wolkenkratzer[i].name));
            console.log("Stadt: " + chalk.green(data.wolkenkratzer[i].stadt));
            console.log("Hoehe: " + chalk.red(data.wolkenkratzer[i].hoehe));
            console.log("------------------------");
        };
    });
});