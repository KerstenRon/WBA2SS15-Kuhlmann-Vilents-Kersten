app.get('/users', function(req, res){
    db.keys('user:*', function(err, rep) { //Alle Keys holen, die mit "user:" beginnen
        var users = []; //Leeres Array, um die User zwischenzuspeichern
        
        if(rep.length == 0){
            res.json(users);
            return;
        }
    db.mget(rep, function(err, rep) { //Hole die Liste aller User auf einmal
        
        //Iteriere über das Antwortarray und füge die User dem Array hinzu
        rep.forEach(function(val){
            users.push(JSON.parse(val));
        });
        
        // Die Eigenschaften rausfiltern, die uns interessieren
        users = users.map(function(user){
            return {id: user.id, name: user.name};
        });
        
        res.json(users);
    });
})