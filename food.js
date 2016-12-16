var change = twoPlayer;
function Food(){
	this.x;
	this.y;
	this.show = function(){
		fill(100, 255, 0);
		rect(this.x, this.y, scl, scl);
	}
	this.pickLocation = function(){
		var cols = floor(width/scl);
		var rows = floor(height/scl);
		this.x = floor(random(cols))*scl;
		this.y = floor(random(rows))*scl;
	}
}
