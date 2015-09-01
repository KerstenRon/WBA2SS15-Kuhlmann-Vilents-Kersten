function rndmInt(low, high) {
    'use strict';
    return Math.floor(Math.random() * (high - low) + low);
}
    
function countDown(time, id) {
    'use strict';
    var s = time % 60, strC = ' ' + s + ' ';
    if (time > 0) {
            //Countdown-Funktion erneut aufrufen
            //diesmal mit einer Sekunde weniger
        $(window).setTimeout('countdown(' + (--time) + ',\'' + id + '\')', 1000);
    } else {
        strC = "Go!";
    }
    $(document).getElementByID(id).innerHTML = strC;
}
    
function clickgame(time) {
    'use strict';
    $('#start').text("Click!");
    $c = 0;
}
        
    
function startCountdown(time, id) {
    'use strict';
    countDown(time, id);
}

$(document).ready(function () {
    
    var count = 0;
    
    'use strict';
    $('#start').click(function () {
        count++;
        console.log("Zähler: " + count);
        
    });
});