var Asteroid = function() {
	this.velocity = this.randomVelocity();

	// this.randomAsteroid = function() {
	// 	var x = Math.random() * 800;
	// 	var y = Math.random() * 800;
	// 	return [x,y];
	// };

	this.color = "(" + Math.floor(Math.random() * 255) + "," + 136 + "," + 129 + ")";
	this.radius = Math.random() * 30 + 10;

	this.position = this.randomPosition();
	console.log(this.position);
};

Asteroid.prototype.draw = function(canvas) {

		canvas.fillStyle = "rgb" + this.color;
		canvas.beginPath();
		canvas.arc(this.position[1],this.position[0],this.radius, 0, 2*Math.PI);
		canvas.fill();
		canvas.stroke();
	};

Asteroid.prototype.update = function() {

		this.position = [this.position[0] + this.velocity['x'],
										 this.position[1] + this.velocity['y']];
		if(this.position[1] < 0){
			this.position[1] = 799;
		}else if(this.position[1] > 800){
			this.position[1] = 1;
		}else if(this.position[0] < 0){
			this.position[0] = 799;
		}else if(this.position[0] > 800){
			this.position[0] = 1;
		};
	};

Asteroid.prototype.randomPosition = function() {
		var posX = Math.random() * 200;
		var posY = Math.random() * 200;
		return [posX,posY];
	};

Asteroid.prototype.randomVelocity = function() {
	var vecX = Math.random() * -5 + 2.5;
	var vecY = Math.random() * -5 + 2.5;
	return {x: vecX, y: vecY};
};

function Game (canvas) {
	this.canvas = canvas;
	this.asteroids = [];
	this.ship = new Ship (this.canvas);

	var that = this;

	this.draw = function() {
 	  for(var i = 0; i < this.asteroids.length; i++){
 	  	this.asteroids[i].draw(this.canvas);
 	  }
 	  this.ship.draw(this.canvas)
	};
	//NED - should we always bind

	this.update = function() {
		//call Asteroid update
 	  for(var i = 0; i < that.asteroids.length; i++){
 	  	that.asteroids[i].update();
 	  }

 	  that.canvas.clearRect(0,0,800,800);
 	  that.draw(that.canvas);
 	  if(that.ship.isHit(that.asteroids) ){
 	  	window.alert("You Lost");
 	  }
	};

	this.start = function() {
		for(var i = 0; i < 20; i++){
			this.asteroids.push(new Asteroid());
		}
		//setInterval, call Game#update, follow with Game#draw.
		window.setInterval(that.update, 100);
	};
};

var distance = function(cord1, cord2) {
	return ( Math.pow((Math.pow((cord1[0] - cord2[0]), 2) + Math.pow((cord1[1] - cord2[1]), 2)), .5) );

};

function Ship (ctx) {
	this.position = [400,400];
	this.speed = 0;
	this.radius = 10.5;
	this.velocity = {x: 0, y: 0}


	this.draw = function(ctx) {
		ctx.fillStyle = "#FF35E1";
		// ctx.save();
		// ctx.rotate(20*Math.PI/180);
		ctx.beginPath();
		
		ctx.moveTo(this.position[1], this.position[0]);
		ctx.lineTo(this.position[1] - 12, this.position[0] + 15);
		ctx.lineTo(this.position[1], this.position[0] - 18);
		ctx.lineTo(this.position[1] + 12,this.position[0] + 15);
		ctx.lineTo(this.position[1], this.position[0]);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
		//ctx.restore();
		//ctx.rotate(200*Math.PI/180);

	};

	this.isHit = function(asteroids) {
		for(var i = 0; i < asteroids.length; i++){
			if(distance(this.position, asteroids[i].position) < (this.radius + asteroids[i].radius)){
				return true;
			}	
		}
	};
};

function Bullet (){
	
}




