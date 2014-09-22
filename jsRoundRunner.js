/**
 * Object:  jsRoundRunner
 * Version: master
 * Author:  Edouard Kombo
 * Twitter: @EdouardKombo
 * Github:  Edouard Kombo
 * Url:     https://github.com/edouardkombo/jsRoundRunner
 * 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * 
 * Javascript counter application with many features that helps you count up and down.
 */

var jsRoundRunner = function(){};

jsRoundRunner.prototype = {
    startsAt: 120,
    endsAt: 0,
    changeColorAt: false,
    changeColorColor: '#FF0000',
    baseColor: '#000',
    rafTimer: '',
    allowMinutesAndSeconds: false,
    addToView: false,
    substituteTimer: '',
    counterTagId: '',
    callBack: '',
    stopped: false,
    timeOut: '',

    /**
     * Start timer
     * 
     * @returns {undefined}
     */
    start: function() 
    {
        this.substituteTimer    = this.startsAt;
        this.rafTimer           = requestAnimationFrame(this.runnerMethod.bind(this));
        this.stopped            = false;         
    },        
    
    /**
     * Method that counts up or down, depending on your parameters
     * 
     * @returns {undefined}
     */
    runnerMethod: function () 
    {   
        this.timeOut = setTimeout(function() {
            
            //If animation is stopped, do not continue
            if (true === this.stopped) {
                this.substituteTimer = 0;
                clearTimeout(this.timeOut);
            }            
            
            //Increase or decrease timer depending on your parameters
            this.substituteTimer = this.operator(this.substituteTimer);         
            
            //If time has elapsed
            if (this.substituteTimer === this.endsAt) {
                
                //Cancel animation
                clearTimeout(this.timeOut);
                
                //Stop animation if it hasn't been
                if (false === this.stopped) {
                    this.stopped = true;
                    this.stop();
                }
                
                //Show nothing on the counter
                this.showCounter('');
                
            } else {
                
                //Show the counter value and continue animation
                this.showCounter(this.substituteTimer);
                this.rafTimer = requestAnimationFrame(this.runnerMethod.bind(this));                
            }
            
        }.bind(this), 1000);     
    },
    
    /**
     * Increase or decrease timer depending on your parameters
     * 
     * @param {Number} value
     * @returns {Number}
     */
    operator: function(value)
    {
        return (this.startsAt > this.endsAt) ? value - 1 : value + 1 ;       
    },    
    
    /**
     * Stop animation counter
     * 
     * @returns {undefined}
     */
    stop: function()
    {
        //Stop animation
        this.stopped = true;
        cancelAnimationFrame(this.rafTimer);
        clearTimeout(this.timeOut);        
        this.rafTimer = '';
        
        this.showCounter(this.substituteTimer);
        
        //Reset substituteTime to initial value
        this.substituteTimer = (this.startsAt > this.endsAt) ? this.endsAt : this.startsAt;
        
        //reset vars
        this.allowMinutesAndSeconds = false;
        this.addToView = false;
        
        //Return counter to base colour if needed
        if (false !== this.changeColorAt) {
            document.getElementById(this.counterTagId).style.setProperty ("color", this.baseColor, "important");
        }
        
        
        this.changeColorAt = false;
        
        //Trigger call back method
        this.callbackMethod();      
    },    
    
    /**
     * Main method to render counter to html in the specific format
     * 
     * @param {type} value
     * @returns {undefined}
     */
    showCounter: function(value) 
    {
        if (value === '') {
            document.getElementById(this.counterTagId).innerHTML = '';
        } else {
            var thisTime = this.convertToHHMMSS(this.substituteTimer);
            
            thisTime = this.addViewToCounter(thisTime);
            
            this.changeCounterColor();
            
            document.getElementById(this.counterTagId).innerHTML = thisTime;
        }
    },
    
    /**
     * Convert timestamp to HHMMSS format
     * 
     * @param {Nmber} thisTime
     * @returns {Number|jsCounter.prototype@call;formatNumbers|jsCounter.prototype.convertToHHMMSS.minutes|jsCounter.prototype.convertToHHMMSS.hours}
     */
    convertToHHMMSS: function (thisTime)
    {
        var hours   = Math.floor(thisTime / 3600);
        var minutes = Math.floor((thisTime - (hours * 3600)) / 60);
        var seconds = thisTime - (hours * 3600) - (minutes * 60);       

        hours       = this.formatNumbers(hours, 'hours');
        minutes     = this.formatNumbers(minutes, 'minutes');
        seconds     = this.formatNumbers(seconds, 'seconds');      

        if (this.allowMinutesAndSeconds) {
            var result  = minutes + seconds;
        } else {
            var result  = hours + minutes + seconds;
        }
        
        return result;        
    },
    
    /**
     * Add text to counter view if specified 
     * 
     * @param {Number} thisTime
     * @returns {Boolean}
     */
    addViewToCounter: function (thisTime)
    {
        return (false !== this.addToView) ? thisTime + this.addToView : thisTime;       
    },    
    
    /**
     * Change counter color dependding on params
     * 
     * @returns {undefined}
     */
    changeCounterColor: function ()
    {
        if (false !== this.changeColorAt) {
            if (this.substituteTimer >= this.changeColorAt) {
                document.getElementById(this.counterTagId).style.setProperty ("color", this.changeColorColor, "important");
            }
        }        
    },    
    
    /**
     * Format numbers to correct format (seconds only, minutes and seconds only, etc...)
     * 
     * @param {Number} number
     * @param {String} type
     * @returns {String}
     */
    formatNumbers: function(number, type) 
    {
        var result = '';
        
        if (number === 0) {
            result = (this.allowMinutesAndSeconds && (type === 'minutes')) ? '0' + number + ':' : '' ;
        } else if (number >= 10) {
            result = (type !== 'seconds') ? number + ':' : number; 
        } else {
            result = (type !== 'seconds') ? "0" + number + ':' : "0" + number;
        }
        
        return result;
    },    
    
    /**
     * Function to execute when everything is finished
     * 
     * @returns {jsCounter.prototype@call;callBack}
     */
    callbackMethod: function()
    {
        return this.callBack();
    }
};