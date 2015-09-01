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

function clickFight() {
    'use strict';
    var i = 61;
   
    var running = window.setInterval( function func() {
        $('.dl-text').text(--i);
        if (i === 0) {
            window.clearInterval(running);
            $('#clicker').prop('id', 'start');
            $('#start').text("Ende!");
        }
    }, 1000);
}

$(document).ready(function () {
    'use strict';
    var count = 0, started = false;
    
    $('#start').click(function () {
        if (!started) {
            console.log("Gleich geht's los...");
            $('#back').fadeOut(200);
            startTimer();
            started = true;
            console.log(started);
        } else {
            $('.dl-title').text("Click dich zum Sieg!");
            $('#start').prop('id', 'clicker');
            clickFight();
        }
    });
    
    $('#clicker').click(function () {
        count = count + 1;
        $('#clicker').text(count);
        console.log(count);
    });
});