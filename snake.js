function Snake() {
	this.x = width/2;
	this.y = height/2;
	this.minSpeed = 1;
	this.xspeed = 1;
	this.yspeed = 0;
	this.dead = false;
	this.length = 1;
	this.change = false;
	this.head;
	this.tail = [];
	this.rand = [];
	this.color = [];
	this.update = function(){
		if(! this.dead){
			if(this.length === this.tail.length){
				for(var i = 0; i<this.tail.length-1; i++){
					this.tail[i] = this.tail[i+1];	
				}
			}	
			this.tail[this.length-1] = createVector(this.x, this.y);
			
			for(var i = 0; i<this.tail.length-1; i++){
				var d = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);
				if(d<1)
					this.dead = true;
			}
			this.x = this.x + this.xspeed*scl;
			this.y = this.y + this.yspeed*scl;
			 
			if(this.x >= width || this.x < 0 || this.y >= height || this.y < 0){
				if(!wrap)
					this.dead = true;
				else{
					if(this.x >= width)
						this.x = 0;
					if(this.y >= height)
						this.y = 0;
					if(this.x < 0)
						this.x = width;
					if(this.y < 0)
						this.y = height;
				}
			}
			
		}
		else{
			StartMenu.style.visibility="visible";
			difficulty.style.visibility="visible";
			players.style.visibility="visible";
			//this.dead = false;
			start = false;
		}
	}
	this.eat = function(x, y){
		var d = dist(this.x, this.y, x, y);
		if(d < 1){
			this.length++;
			if(this.length % 2 === 0)
				this.minSpeed++;
			return true;
		}
		else
			return false;
	}
	this.show = function(){
		if(! this.dead){
			if(this.length < 5){
				this.color[0] = 255;
				this.color[1] = 255;
				this.color[2] = 255;
			}

			fill(this.color[0], this.color[1], this.color[2]);
			
			if(this.change){
				this.rand[0] = random(255);
				this.rand[1] = random(255);
				this.rand[2] = random(255);
				this.change = false;
			}
			if(this.length % 4 === 0)
				this.change = true;
			if(this.length % 5 === 0){
				for(var i = 0; i < 3 ; i++)
					this.color[i] = this.rand[i];
			}
			for(var i = 0; i<this.tail.length; i++){
				rect(this.tail[i].x, this.tail[i].y, scl, scl);
			}
			rect(this.x, this.y, scl, scl);
		}
	}
	this.dir = function(x,y){
		this.xspeed = x;
		this.yspeed = y;
	}
}
