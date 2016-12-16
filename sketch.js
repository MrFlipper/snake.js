var s;
var s2;
var scl = 20;
var food;
var obs;
var obSpawn = false;
var start = false;
var twoPlayer = false;
var wrap = true;
var diff = 0;
function setup(){
	//Create the canvas
	var canvas = createCanvas(600,600);

	//If start game is cliked, start game and remove images
	document.getElementById('StartMenu').onclick = function(){

		//Assign initial variables
		//startMenu = StartMenu;
		s = new Snake();
		food = new Food();
		s2 = new Snake();
		obs = new Obs();
		
		this.style.visibility="hidden";
		difficulty.style.visibility="hidden";
		players.style.visibility="hidden";

		start = true;
		if(twoPlayer){
			s2.x = 0;
			s2.y = 0;
			s2.dir(0,1);
			s2.head = 1;

			s.x = width-scl;
			s.y = height-scl;
			s.dir(0,-1);
			s.head = 3;
		}
		else{
			s.x = width/2;
			s.y = height/2;
			s.dir(1,0);
			s.head = 0;
		}
		food.pickLocation();
	}
	//Change difficulty when diff button is clicked
	document.getElementById('difficulty').onclick = function(){
		if(diff == 0){
			diff = 1;
			this.src="pictures/medium.png"
			wrap = false;
		}
		else if(diff == 1){
			diff = 2;
			this.src="pictures/hard.png";
			obSpawn = true;
			wrap = false;
		}
		else if(diff == 2){
			diff = 0;
			this.src="pictures/easy.png";
			obSpawn = false;
			wrap = true;
		}
	}
	//Change # of players when players button is clicked
	document.getElementById('players').onclick = function(){
		if(!twoPlayer){
			twoPlayer = true;
			this.src="pictures/twoPlayer.png";
		}
		else{
			twoPlayer = false;
			this.src="pictures/onePlayer.png";
		}
	}

	// //Assign initial variables
	startMenu = StartMenu;
	s = new Snake();
	food = new Food();
	s2 = new Snake();
	obs = new Obs();



	//Set starting position of second player
	s2.x = 0;
	s2.y = 0;
	s2.dir(0,1);
	s2.head = 1;

	//Pick Location of food
	food.pickLocation();
	
	frameRate(15);
}

function draw() {
	//Set background color 
	background(51);

	//Draw the grid
	for(var i = 0; i<width; i++){
		fill(51, 100);
		rect(i*scl, 0, scl, width);
		rect(0, i*scl, height, scl);
	}
	//If start is true, start the game
	if(start){
		s.show();
	    s.update();
	    //If there should be two players, start second player
	    if(twoPlayer){
			s2.show();
			s2.update();
			obSpawn = false;
		}
		//If snake eats food reset food
		if(s.eat(food.x, food.y)){
			food.pickLocation();
		}
		//If second snake eats food reset second food 
		if(twoPlayer && s2.eat(food.x, food.y)){
			food.pickLocation();
		}
		//If obstacles are being spawned, check if snake has hit obstacle and create new obstacle when necesarry
		if(obSpawn){
			if(s.length % 3 === 0 && obs.spawn){
				obs.pickLocation();
				obs.spawn = false;
			}
			if(s.length % 3 != 0)
				obs.spawn = true;
			for(var i = 0; i < obs.list.length; i++){
				var d = dist(s.x, s.y, obs.list[i].x, obs.list[i].y);
				if(d<1)
					s.dead = true;
			}
			obs.show();
		}
		//Show food
		food.show();
	}
}

function keyPressed(){
	if(keyCode === UP_ARROW){
		if(s.head != 1){
			s.dir(0,-1);
			s.head = 3;
		}
	}else if(keyCode == DOWN_ARROW){
		if(s.head != 3){
			s.dir(0,1);
			s.head = 1;
		}
	}else if(keyCode == LEFT_ARROW){
		if(s.head != 0){
			s.dir(-1,0);
			s.head = 2;
		}
	}else if(keyCode == RIGHT_ARROW){
		if(s.head != 2){
			s.dir(1,0);
			s.head = 0;
		}
	}
	else if(keyCode === 0xBC){
		if(s2.head != 1){
			s2.dir(0,-1);
			s2.head = 3;
		}
	}else if(keyCode == 0x4F){
		if(s2.head != 3){
			s2.dir(0,1);
			s2.head = 1;
		}
	}else if(keyCode == 0x41){
		if(s2.head != 0){
			s2.dir(-1,0);
			s2.head = 2;
		}
	}else if(keyCode == 0x45){
		if(s2.dir != 2){
			s2.dir(1,0);
			s2.head = 0;
		}
	}else if(keyCode == 0x0D){
		start = true;
		startMenu.remove();
	}
}