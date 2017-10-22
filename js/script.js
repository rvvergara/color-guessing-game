/*
===============================================
COLOR GUESSING GAME 
==============================================
idea credited to Colt Steele's Web Developer Bootcamp Udemy course
*/

//create variables to elements vital for functionality

var guessMe = document.querySelector("#guess_me"); //so as to indicate a random rgb code that will be indicated in the heading
var squares = document.querySelectorAll(".square"); //so as to select individual colored squares 
var sLength = squares.length; //number of squares 
var h1Element = document.querySelector("h1");
var message = document.querySelector(".message"); 
var random1 = Math.round(Math.random()*(sLength-1)); //generates a random number from 0-5 for use in determining rgb code to put in guessMe
var instruction = document.querySelector("#instructions");
var isEasy;

//applies random background colors for each square during page load:

for(var i=0;i<sLength;i++){
		squares[i].style.backgroundColor = "rgb("+randomColor()+","+randomColor()+","+randomColor()+")";
	}

//random1 will indicate which of the squares whose background color will be indicated in guessMe
guessMe.innerHTML = squares[random1].style.backgroundColor;

//function to be able to click X in instructions and close the whole instruction box
function closeInstruction(e){
	document.body.removeChild(instruction);
}
	
//creates random rgb colors to be applied as background color for each square
function randomColor(){
	var random2 = Math.round(Math.random()*256);
	return random2;
}

//what happens if user clicks on EASY in the navigation
function easy(e){
	if(isEasy){
		return; //if game is already on Easy mode, nothing will happen
	}
	isEasy = true;
	whichGame(isEasy); //if game is in Hard mode, script calls for the whichGame function that will change the mode to Easy
	e.target.classList.add("highlight");	
}

function hard(e){
	if(!isEasy){
		return; //if game is already in Hard mode, nothing will happen
	}
	isEasy = false;
	whichGame(isEasy); //if game is in Easy mode, script calls for whichGame so as to change to Easy mode
	e.target.classList.add("highlight");	
}


function whichGame(isEasy){
	
	//if Easy mode is invoked, the page will only show 3 squares. Actual divs are still present but the background colors of the last 3 squares will be changed to that of the page background
	if(isEasy){
		sLength = squares.length-3; //sLength will only be 3 during Easy mode
		random1 = Math.round(Math.random()*(sLength-1)); 
		for(var i=0;i<sLength;i++){
			squares[i].style.backgroundColor = "rgb("+randomColor()+","+randomColor()+","+randomColor()+")"; //only first 3 squares will have random background color
			squares[i+3].style.backgroundColor = "#232323"; //last 3 squares will have background color of page
			}
		document.querySelector(".hard").classList.remove("highlight"); 
		guessMe.innerHTML = squares[random1].style.backgroundColor; //guessMe innerHTML will be background color of one of the 3 squares
	}
	else{
		sLength = squares.length;
		random1 = Math.round(Math.random()*(sLength-1));
		for(var i=0;i<sLength;i++){
			squares[i].style.backgroundColor = "rgb("+randomColor()+","+randomColor()+","+randomColor()+")";
			} //in Hard mode, all 6 squares will each have random background color
		document.querySelector(".easy").classList.remove("highlight");				
		guessMe.innerHTML = squares[random1].style.backgroundColor;	//guessMe innerHTML will be background color of one of the 6 squares	
		}
	message.innerHTML = ""; //resets the message box
	message.classList.remove("highlight"); //resets the message box
	h1Element.style.backgroundColor = "#2a5160"; //resets the h1 element background color
}

function resetGame(e){
	whichGame(isEasy); //invokes whichGame function to provide new set of colors 
	e.target.classList.remove("highlight"); //resets the style of the Reset button
	e.target.innerHTML = "New Color"; //resets the text in the Reset button
}

function colorGuess(e){
	e.stopPropagation(); //makes sure that clicking the .container will not mess up the functionality - using event bubbling
	if(e.currentTarget != e.target){
		if(guessMe.innerHTML != e.target.style.backgroundColor){
			//what happens if the user clicks on the wrong box 
			e.target.style.backgroundColor = "#232323";
			message.innerHTML = "Wrong";
			message.classList.add("highlight");
		}
		else{
			correctAnswer(); //function for when user clicks on right box is separated for cleaner code
		}
	}
}

function correctAnswer(){
	for(var i=0;i<sLength;i++){
		squares[i].style.backgroundColor = guessMe.innerHTML; //if user clicks on correct box, all boxes (3 if Easy mode) will have background color of the correct box
		}
	message.innerHTML = "You are correct!";
	message.classList.add("highlight");
	h1Element.style.backgroundColor = guessMe.innerHTML; //changes h1 element's background into the correct box's background color
	document.querySelector(".reset").innerHTML = "Play Again" //changes Reset button text to invite user to play again
}

//what happens if user hovers over the Reset (New Color || Play Again), Easy or Hard buttons
function hoverOver(e){
	e.stopPropagation();
	if(e.currentTarget != e.target){
		if(e.type == "mouseover"){
			e.target.classList.add("hover");		
		}
		else if(e.type == "mouseout"){
			e.target.classList.remove("hover");
		}
	}
}

document.querySelector("a").addEventListener("click",closeInstruction);
document.querySelector(".easy").addEventListener("click",easy);
document.querySelector(".hard").addEventListener("click",hard);
document.querySelector(".reset").addEventListener("click",resetGame);
document.querySelector(".container").addEventListener("click",colorGuess);
document.querySelector(".navbar").addEventListener("mouseover",hoverOver);
document.querySelector(".navbar").addEventListener("mouseout",hoverOver);