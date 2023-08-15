var player_Y = right_interval = left_interval = jump_interval = X_from_jump = minutes = points = 0, player_X = 8, seconds = miliseconds = "00", objects = [];
//////////////////////////////////////////////
var lives = 3;                              //
var game_speed = 4;                         // Game config
var jump_height = 150;                      //
var floor_height = 50;                      //
var player_height = 50;                     //
var player_width = 30;                      //
var platform_height = 20;                   //
var platform_width = 200;                   //
var platform_color = "black";               //
var floor_color = "black";                  //
var player_color = "gray";                  //
var enemy_color = "purple";                 //
var level_length = 3000;                    //
var score_for_kills = 50;                   //
var score_for_death = -100;                 //
//////////////////////////////////////////////////////////////////////////////////////
for (var i = 0; i < lives; i++){                                                    //
	$('<div> </div>').appendTo('#lives');                                           // CSS properties
	$('#lives > div:last-child').css({"background": "url('heart.png')",             //
		"background-size": "100%",                                                  //
		"width": "106px",                                                           //
		"height": "105px",                                                          //
		"transform": "translate(" + 100 * i + "%, 0)"});}                           //
$('#floor').css({"background": floor_color,                                         //
	"height": floor_height});                                                       //
$('#player').css({"background": player_color,                                       //
	"width": player_width,                                                          //
	"height": player_height,                                                        //
	"margin-top": parseInt($('#floor').css("margin-top")) - player_height});        //
$('<div id="flag"> </div>').insertAfter($('#platforms'));                           //
$('#flag').css({"background": "url('flag.png')",                                    //
	"width": "85px",                                                                //
	"height": "142px",                                                              //
	"margin-left": level_length - 100,                                              //
	"margin-top": parseInt($('#floor').css("margin-top")) - 142});                  //
///////////////////////////////////////////////////////////////////////////////////////////////
clock = setInterval(function(){                                                              //
	if (parseInt(miliseconds) < 9) miliseconds = "0" + String(parseInt(miliseconds) + 1);    // Timer
	else miliseconds = parseInt(miliseconds) + 1;                                            //
	if (miliseconds == 100){                                                                 //
		miliseconds = "00";                                                                  //
		if (parseInt(seconds) < 9) seconds = "0" + String(parseInt(seconds) + 1);            //
		else seconds = parseInt(seconds) + 1;}                                               //
	if (seconds == 60) seconds = "00", minutes++;                                            //
	timer.innerText = String(minutes) + ":" + String(seconds) + "." + String(miliseconds);   //
	score.innerText = points;}, 10);                                                         //
///////////////////////////////////////////////////////////////////////////////////////////////
setInterval(function(){                                                           //
	$('.enemy_right').css("left", "+=1");                                         // Enemy movement
	for (i of objects)                                                            //
		if ((i.className == "enemy_right") &&                                     //
			(i.getBoundingClientRect().right >=                                   //
			objects[objects.indexOf(i) - 1].getBoundingClientRect().right))       //
			i.className = "enemy_left";                                           //
	if (check_collision_left() && (i.className == "enemy_right"))                 //
		player_death();}, game_speed);                                            //
setInterval(function(){                                                           //
	$('.enemy_left').css("left", "-=1");                                          //
	for (i of objects)                                                            //
		if ((i.className == "enemy_left") &&                                      //
			(i.getBoundingClientRect().left <=                                    //
			objects[objects.indexOf(i) - 1].getBoundingClientRect().left))        //
			i.className = "enemy_right";                                          //
	if (check_collision_right() && (i.className == "enemy_left"))                 //
		player_death();}, game_speed);                                            //
////////////////////////////////////////////////////////////////////////////////////
function player_death(){                                                  //
	$('#player').css({"left": 8, "top": 8});                              // Player death
	$('#platforms').css("left", 8);                                       //
	player_X = 0, player_Y = 0, lives--, points += score_for_death;       //
	$('#lives > div:last-child').animate({"opacity": 0,                   //
		"width": "+=50",                                                  //
		"height": "+=50",                                                 //
		"left": "-=50"}, 1000,                                            //
		function(){$('#lives > div:last-child').remove();});              //
	if (lives == 0)                                                       //
		game_over();}                                                     //
////////////////////////////////////////////////////////////////////////////
function game_over(){
	console.log("Bruh1");
	$('div').animate({"opacity": 0}, 1000,
		function(){$('div').css("display", "none");
			console.log("Bruh");
			var fade = 255;
			screen_fade = setInterval(function(){
				fade--;
				$('body').css("background", "rgb(" + fade + ", " + fade + ", " + fade + ")");
				if (fade <= 0){
					console.log("bruh");
					clearInterval(screen_fade);}}, 4);
			
		}
	);
}
//////////////////////////////////////////////////////////////////////////////////////////////
function move_right(){                                                                      //
	if (!right_interval)                                                                    // Horizontal player movement
		right_interval = setInterval(function(){                                            //
			if (!check_collision_right() && (player_X < level_length - 20)){                //
				if ((++player_X < parseInt($('body').css("width")) / 2) ||                  //
					(player_X + parseInt($('body').css("width")) / 2 >= level_length))      //
					$('#player').css("left", "+=1");                                        //
				else                                                                        //
					$('#platforms, #flag').css("left", "-=1");}                             //
			if (!check_collision_bottom() && (!jump_interval) && (player_Y != 0))           //
				stop_jump();}, game_speed);}                                                //
function stop_move_right(){                                                                 //
	clearInterval(right_interval);                                                          //
	right_interval = 0;}                                                                    //
function move_left(){                                                                       //
	if (!left_interval)                                                                     //
		left_interval = setInterval(function(){                                             //
			if (!check_collision_left() && (player_X >= 8)){                                //
				if ((--player_X < parseInt($('body').css("width")) / 2) ||                  //
					(player_X + parseInt($('body').css("width")) / 2 >= level_length))      //
					$('#player').css("left", "-=1");                                        //
				else                                                                        //
					$('#platforms, #flag').css("left", "+=1");}                             //
			if (!check_collision_bottom() && (!jump_interval) && (player_Y != 0))           //
				stop_jump();}, game_speed);}                                                //
function stop_move_left(){                                                                  //
	clearInterval(left_interval);                                                           //
	left_interval = 0;}                                                                     //
//////////////////////////////////////////////////////////////////////////////////////////////////
function jump(){                                                                                //
	if (!jump_interval)                                                                         // Vertical player movement
		jump_interval = setInterval(function(){                                                 //
			$('#player').css("top", player_Y - ++X_from_jump + 8 + "px");                       //
			if (check_collision_top() || (X_from_jump >= jump_height))                          //
				stop_jump();}, game_speed);}                                                    //
function stop_jump(){                                                                           //
	if (!check_collision_bottom() && (!jump_interval) && (player_Y != 0))                       //
		X_from_jump = -player_Y, player_Y = 0, jump_interval = -1;                              //
	clearInterval(jump_interval);                                                               //
	if (jump_interval)                                                                          //
		jump_interval = setInterval(function(){                                                 //
			$('#player').css("top", player_Y - --X_from_jump + 8 + "px");                       //
			if ((X_from_jump == 0) && !check_collision_bottom())                                //
				X_from_jump = -player_Y, player_Y = 0;                                          //
			else if (check_collision_bottom() && ((i.className == "enemy_left") ||              //
				(i.className == "enemy_right"))){                                               //
				clearInterval(jump_interval);                                                   //
				jump_interval = 0, player_Y -= X_from_jump - ~~(jump_height / 2);               //
				X_from_jump = ~~(jump_height / 2);                                              //
				jump();                                                                         //
				document.getElementById('platforms').removeChild(i);                            //
				objects.splice(objects.indexOf(i), 1);                                          //
				points += score_for_kills;}                                                     //
			if (check_collision_bottom() || (X_from_jump == 0)){                                //
				clearInterval(jump_interval);                                                   //
				player_Y -= X_from_jump, X_from_jump = 0, jump_interval = 0;}}, game_speed);}   //
//////////////////////////////////////////////////////////////////////////////////////////////////
function check_collision_right(){                                                           //
	for (i of objects)                                                                      // Collision checks
		if ((i.getBoundingClientRect().left <= player.getBoundingClientRect().right) &&     //
			(i.getBoundingClientRect().left >= player.getBoundingClientRect().left) &&      //
			(player.getBoundingClientRect().bottom > i.getBoundingClientRect().top) &&      //
			(player.getBoundingClientRect().top < i.getBoundingClientRect().bottom))        //
			return true;}                                                                   //
function check_collision_left(){                                                            //
	for (i of objects)                                                                      //
		if ((i.getBoundingClientRect().right >= player.getBoundingClientRect().left) &&     //
			(i.getBoundingClientRect().right <= player.getBoundingClientRect().right) &&    //
			(player.getBoundingClientRect().bottom > i.getBoundingClientRect().top) &&      //
			(player.getBoundingClientRect().top < i.getBoundingClientRect().bottom))        //
			return true;}                                                                   //
function check_collision_top(){                                                             //
	for (i of objects)                                                                      //
		if ((i.getBoundingClientRect().bottom >= player.getBoundingClientRect().top) &&     //
			(i.getBoundingClientRect().bottom <= player.getBoundingClientRect().bottom) &&  //
			(player.getBoundingClientRect().right > i.getBoundingClientRect().left) &&      //
			(player.getBoundingClientRect().left < i.getBoundingClientRect().right))        //
			return true;}                                                                   //
function check_collision_bottom(){                                                          //
	for (i of objects)                                                                      //
		if ((i.getBoundingClientRect().top <= player.getBoundingClientRect().bottom) &&     //
			(i.getBoundingClientRect().top >= player.getBoundingClientRect().top) &&        //
			(player.getBoundingClientRect().right > i.getBoundingClientRect().left) &&      //
			(player.getBoundingClientRect().left < i.getBoundingClientRect().right))        //
			return true;}                                                                   //
/////////////////////////////////////////////////////////////////////////////////////////////////////
function create_platform(){                                                                        //
	for (i of objects)                                                                             // Platform creation &
		if ((event.clientX > i.getBoundingClientRect().left) &&                                    // deletion
			(event.clientX < i.getBoundingClientRect().right) &&                                   //
			(event.clientY > i.getBoundingClientRect().top) &&                                     //
			(event.clientY < i.getBoundingClientRect().bottom)){                                   //
			var deleted = true;                                                                    //
			document.getElementById('platforms').removeChild(i);                                   //
			objects.splice(objects.indexOf(i), 1);                                                 //
			stop_jump();                                                                           //
			break;}                                                                                //
	if (!deleted){                                                                                 //
		$('<div> </div>').appendTo('#platforms');                                                  //
		$('#platforms > div:last-child').css({"width": platform_width,                             //
			"height": platform_height,                                                             //
			"background": platform_color,                                                          //
			"margin-top": event.clientY - 8 - platform_height / 2,                                 //
			"margin-left": event.clientX - platform_width / 2,                                     //
			"left": -parseInt($('#platforms').css("left"))});                                      //
		objects.push(document.querySelector('#platforms > div:last-child'));                       //
		if (Math.random() > 0.5){                                                                  //
			$('<div class="enemy_right"> </div>').appendTo('#platforms');                          //
			$('#platforms > div:last-child').css({"width": $('#player').css("width"),              //
				"height": $('#player').css("height"),                                              //
				"background": enemy_color,                                                         //
				"margin-top": event.clientY - 8 - platform_height / 2 - player_height,             //
				"margin-left": event.clientX - parseInt($('#player').css("width")) / 2,            //
				"left": -parseInt($('#platforms').css("left"))});                                  //
			objects.push(document.querySelector('#platforms > div:last-child'));}}}                //
/////////////////////////////////////////////////////////////////////////////////////////////////////
function check_keydown(){                              //
	if (event.which == 39) move_right();               // Keyboard assignment
	if (event.which == 38) jump();                     //
	if (event.which == 37) move_left();}               //
function check_keyup(){                                //
	if (event.which == 39) stop_move_right();          //
	if (event.which == 38) stop_jump();                //
	if (event.which == 37) stop_move_left();}          //
$(document).bind("keydown", check_keydown);            //
$(document).bind("keyup", check_keyup);                //
$(document).bind("click", create_platform);            //
/////////////////////////////////////////////////////////