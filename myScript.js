// Minutes and seconds track the current time values remaining.
var minutes;
var seconds;
var timer;
// Time that we display to the user.
var totalTime;
// Use the following three variables to measure how long the current countdown lasts (25 min, 4 min, and 15 min).
var pomoTime = 1500;
var shortBreakTime = 240;
var longBreakTime = 900;
var counter;
// Current leftover time, initially 25.
var countRemainder = pomoTime;
// Boolean to start and stop our timer.
var running = false;
// Flag so we know what to set our next countRemainder to.
var chain = 1;
// Used to add the timer to our website's title tab.
var curTitle = document.title;


// Start/Stop button event listener that calls function to control timer flow.
document.getElementById("startStop").addEventListener("click", function(){	
	stopStart();
});


/* Reset button event listener that resets pomodoro chain, resets time on countRemainder, 
resets running flag, and recalculates current time and display to user. */
document.getElementById("reset").addEventListener("click", function(){
	chain = 1;
	countRemainder = pomoTime;
	clearInterval(counter);
	running = false;
	minutes = addZeros(Math.floor(countRemainder / 60));
    seconds = addZeros(countRemainder % 60);
	totalTime = minutes + ':' + seconds;
    document.getElementById("countdownDisplay").innerHTML = totalTime;
	document.title = curTitle + "  " + totalTime;
});


/* Function used for formatting our eventual output times. Function takes in an integer and
adds a leading zero if the integer is less than 10. */
function addZeros(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}


// Function determines how often our countdown timer logic updates. Function is normally called every second.
function timer() {
	countRemainder = countRemainder - 1;
	minutes = addZeros(Math.floor(countRemainder / 60));
    seconds = addZeros(countRemainder % 60);
	
	// if countRemainder == 0, sets the new countRemainder value based off of where we are in our pomodoro chain. 
	if (countRemainder == 0){

		if (chain == 7) {
			countRemainder = longBreakTime;
			chain = 0;
		} else if (chain % 2 == 1) {
			countRemainder = shortBreakTime
			chain++;
		} else {
			countRemainder = pomoTime;
			chain++;
		}
		
		// Snackbar alert logic from W3Schools! 
		// Get the snackbar DIV
		var x = document.getElementById("snackbar")

		// Add the "show" class to DIV
		x.className = "show";

		// After 3 seconds, remove the show class from DIV
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		
		//Sound effect to play when a pomodoro round is over.
		$('#audio').html('<audio autoplay><source src="clock-alarm2.WAV"></audio>');
	}		
	totalTime = minutes + ':' + seconds;
    document.getElementById("countdownDisplay").innerHTML = totalTime;
	document.title = curTitle + "  " + totalTime;
}


/* stopStart controls the counter/interval, which dictates the time displayed to the user.
	depending on the "running" flag, we either clear our counter/interval, or create a new one
	with our saved "countRemainder" value. */
function stopStart() {
	if (running == true) {
		clearInterval(counter);
		running = false;
		
	// start the counter/interval again with our current countRemainder value.
	} else {
		
		// Counter is our setInterval object. This will cause the timer to start.
		counter = setInterval(timer, 1000);
		running = true;
	}
}