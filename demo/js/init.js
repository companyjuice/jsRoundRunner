
/***************************************************
	Init object
***************************************************/
var runner = new jsRoundRunner();

runner.startsAt = 0;
runner.endsAt   = 15;
runner.allowMinutesAndSeconds = true;

if (runner.startsAt < runner.endsAt) {
    runner.addToView        = '/' + runner.endsAt + 's'; //Additional text to add to the counter
    runner.baseColor        = '#000'; //Base color of the timer
    runner.changeColorAt    = 10; //Time in seconds from which counter must change color
    runner.changeColorColor = '#FF0000'; //Color to adapt to counter after color changement   
}

runner.counterTagId = 'counter'; //Div id where to show the counter
runner.callBack     = stopTimer; //Function to call when jsRoundRunner stops 
runner.start();


function stopTimer() {
    alert('Hello world!');
}