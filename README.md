Js Round Runner
===============

Javascript counter application with many features that helps you count up and down.
You can add additional text to counter, change counter color at a specific time
This application has been built in native Javascript.


1) How to install
-----------------

    bower install js-round-runner


2) How to use it?
-----------------

    //Instantiate the object
    var runner = new jsRoundRunner();

    //Set parameters
    runner.startsAt                 = startsAt;
    runner.endsAt                   = endsAt;
    runner.allowMinutesAndSeconds   = false;

    if (runner.startsAt < runner.endsAt) {
        runner.addToView            = '/' + runner.endsAt + 's'; //Additional text to add to the counter
        runner.baseColor            = '#000'; //Base color of the timer
        runner.changeColorAt        = 10; //Time in seconds from which counter must change color
        runner.changeColorColor     = '#FF0000'; //Color to adapt to counter after color changement 
    }

    runner.counterTagId             = 'counter'; //Div id where to show the counter
    runner.callBack                 = stopTimer; //Function to call when jsRoundRunner stops 
    runner.start();

    function stopTimer() {
        alert('Hello world!');
    }

        
3) Live Demonstration
---------------------

http://edouardkombo.github.io/jsRoundRunner/demo/
    

Contributing
-------------

If you do contribute, please make sure it conforms to the PSR coding standard. The easiest way to contribute is to work on a checkout of the repository, or your own fork, rather than an installed version.

Want to learn more? Visit my blog http://creativcoders.wordpress.com


Issues
------

Bug reports and feature requests can be submitted on the [Github issues tracker](https://github.com/edouardkombo/jsRoundRunner/issues).

For further informations, contact me directly at edouard.kombo@gmail.com.
