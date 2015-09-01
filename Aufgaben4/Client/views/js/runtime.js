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
    var i = 61, running = window.setInterval(function func() {
        $('.dl-text').text(--i);
        if (i === 0) {
            window.clearInterval(running);
            //Ist die Zeit abgelaufen, wird der Start-Button wieder eingeblendet.
            $('#start').fadeIn(200).text("Ende!");
        }
    }, 1000);
}

$(document).ready(function () {
    'use strict';
    var count = 0, started = false;
    
    //"Game Controller" - Hauptfunktion für den ClickFight.
    $('#start').click(function () {
        //started fragt die Situation der Timer ab.
        //false: "kleiner" Timer wurde noch nicht gestartet.
        if (!started) {
            console.log("Gleich geht's los...");
            $('#back').fadeOut(200);
            startTimer();
            started = true;
            console.log(started);
        //true: "großer" Timer wurde noch nicht gestartet.
        } else {
            $('.dl-title').text("Click dich zum Sieg!");
            //Erzeugung eines eignes dafür gefertigten Click-Buttons.
            $("<div class=\'dl-btn\' id=\'clicker\'>Click!</div>").insertAfter('#start');
            //Der Start-Button wird für die Dauer des Spiels entfernt.
            $('#start').fadeOut(200);
            clickFight();
        }
    });
    
    //Clickfunktion für den Click-Button, welche allerdings nicht greift...was ist da los?!
    $('#clicker').click(function () {
        count++;
        $('#clicker').text(count);
        console.log(count);
    });
});