var playing = false;

//Kleiner Countdown-Timer ("3...2...1...Los!").
function startTimer() {
    'use strict';
    var i = 4, running = window.setInterval(function func() {
        $('#start').text(--i);
        if (i === 0) {
            window.clearInterval(running);
            console.log("abgelaufen!");
            $('#start').text("Los geht's!");
        }
    }, 1000);
}

//Eigentlicher ClickFight-Timer.
function clickFight() {
    'use strict';
    playing = true;
    var i = 5, running = window.setInterval(function func() {
        $('.dl-text').text(--i);
        if (i === 0) {
            window.clearInterval(running);
            //Ist die Zeit abgelaufen, wird der Start-Button wieder eingeblendet.
            $('#clicker').toggleClass('invisible');
            playing = false;
            $('#start').toggle(200).text("Ende!").off();
            $('#submit').toggleClass('invisible');
        }
    }, 1000);
}

$(document).ready(function () {
    'use strict';
    var count = 0, started = false, uploaded = false, client = new Faye.Client('http://localhost:3000/faye');
    
    //"Game Controller" - Hauptfunktion für den ClickFight.
    $('#start').click(function () {
        //started fragt die Situation der Timer ab.
        //false: "kleiner" Timer wurde noch nicht gestartet.
        if (!started) {
            console.log("Wert: " + started + ".");
            $('#back').fadeOut(200);
            startTimer();
            started = true;
        //true: "großer" Timer wurde noch nicht gestartet.
        } else {
            console.log("Wert: " + started + ".");
            $('.dl-title').text("Click dich zum Sieg!");
            //Erzeugung eines eignes dafür gefertigten Click-Buttons.
            $('#clicker').toggleClass('invisible');
            //Der Start-Button wird für die Dauer des Spiels entfernt.
            $('#start').toggle();
            clickFight();
        }
    });
    
    $('#clicker').click(function () {
        if (playing) {
            count++;
            $('#clicker').text(count);
            console.log(count);
        }
    });
    
    $('#submit').click(function () {
        if (!uploaded) {
            var publication = client.publish('/highscore', {
                'highscore': document.getElementById("clicker").innerHTML,
                'sign': document.getElementById("sign").innerHTML,
                'opponentSign': document.getElementById("opponent-sign").innerHTML,
                'opponentScore': document.getElementById("opponent-score").innerHTML
            });
                            
            publication.then(function () {
                window.alert('Nachricht erfolgreich verschickt.');
            }, function (error) {
                window.alert('Nachricht konnte nicht gesendet werden.');
            });
            uploaded = true;
            $('#submit').toggleClass('invisible');
            $('#result').toggleClass('invisible');
        }
    });
});