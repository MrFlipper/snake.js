function Obs(){
	this.x;
	this.y;
	this.spawn = true;
	this.list = [];

	this.show = function(){
		fill(0);
		for(var i = 0; i<this.list.length; i++){
			rect(this.list[i].x, this.list[i].y, scl, scl);
		}
	}
	this.pickLocation = function(){
		var cols = floor(width/scl);
		var rows = floor(height/scl);
		this.x = floor(random(cols))*scl;
	        this.y = floor(random(rows))*scl;
		this.list[this.list.length] = createVector(this.x, this.y);
	}
}
