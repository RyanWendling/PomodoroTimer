// minutes and seconds track the current time values remaining.
var minutes;
var seconds;
var timer;
// time that we display to the user.
var totalTime;
// use the following three variables to measure how long the current countdown lasts.
var pomoTime = 1500;
var shortBreakTime = 240;
var longBreakTime = 900;
// var pomoTime = 15;
// var shortBreakTime = 12;
// var longBreakTime = 19;
// get remaining time left on current countdown duration. DELETE 
var count = document.getElementById("countdownDisplay");
var counter;
// current leftover time, initially 25
var countRemainder = pomoTime;
// boolean to start and stop our timer
var running = false;
// flag so we know what to set our countRemainder to.
var chain = 1;


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
	
	/* if countRemainder == 0, we reset our time according to our level.
	Also changes the new countRemainder value based off of where we are in our pomodoro chain. */
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
		
		/*Snackbar alert logic from W3Schools! */
		// Get the snackbar DIV
		var x = document.getElementById("snackbar")

		// Add the "show" class to DIV
		x.className = "show";

		// After 3 seconds, remove the show class from DIV
		setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
		
		//Sound effect
		$('#audio').html('<audio autoplay><source src="clock-alarm2.WAV"></audio>');
	}		
	//if (countRemainder < 0) {
		
		//return;
	//}
	totalTime = minutes + ':' + seconds;
    document.getElementById("countdownDisplay").innerHTML = totalTime;
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
		
		// counter is our setInterval object, this will cause the timer to start
		counter = setInterval(timer, 1000);
		running = true;
	}
}