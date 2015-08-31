function rndmInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}
    
function countDown(time, id){
    s = time % 60;
    strC = ' ' + s + ' ';
    if(time > 0){
            //Countdown-Funktion erneut aufrufen
            //diesmal mit einer Sekunde weniger
        $(window).setTimeout('countdown('+ --time+',\''+id+'\')',1000);     
    } else {
        strC = "Go!";
    }
    $(document).getElementByID(id).innerHTML = strC;
}
    
function clickgame(time){
    $('#start').text("Click!");
    $c = 0;
    
        
    
function startCountdown(time, id){
    countDown(time, id);
}

$(document).ready(function(){
    
    
    $('#start').click(function(){
        startCountdown(500, 'cd'); 
});