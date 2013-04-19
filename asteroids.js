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
 	  this.ship.draw(this.canvas);

 	  for(var i = 0; i < this.ship.bullets.length; i++){
      this.ship.bullets[i].draw(this.canvas);
    }
	};
	//NED - should we always bind

	this.update = function() {
		//call Asteroid update
 	  for(var i = 0; i < that.asteroids.length; i++){
 	  	that.asteroids[i].update();

 	  	var bulletOffset = 0;
 	  	var asteroidOffset = 0;
   		for(var j = 0; j < that.ship.bullets.length; j++){
	    	var testBullet = that.ship.bullets[j];
	    	testBullet.update();

      if(distance(testBullet.position, that.asteroids[i].position) < (testBullet.radius + that.asteroids[i].radius)){
				that.ship.bullets.splice(j - bulletOffset, 1);
      	bulletOffset += 1;
      	
      	that.asteroids.splice(i - asteroidOffset, 1)
      	that.asteroids.push(new Asteroid());
      	asteroidOffset += 1;
			}	

      if(testBullet.position[1] < 0 || testBullet.position[1] > 800 || testBullet.position[0] < 0 || testBullet.position[0] > 800){
      	that.ship.bullets.splice(j - bulletOffset, 1);
      	bulletOffset += 1;
    	}
 	  }
   };

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
		window.setInterval(that.update, 32);
	};
};

var distance = function(cord1, cord2) {
	return ( Math.pow((Math.pow((cord1[0] - cord2[0]), 2) + Math.pow((cord1[1] - cord2[1]), 2)), .5) );

};

function Ship (ctx) {
	this.position = [400,400];
	this.speed = 0;
	this.radius = 10.5;
	this.rotation = 0;
	this.velocity = {x: 0, y: 0};
	this.bullets = [];


	this.draw = function(ctx, rotation) {
		ctx.fillStyle = "#FF35E1";
		ctx.beginPath();

		rotatedX = Math.sin(this.rotation);
		rotatedY = Math.cos(this.rotation);	
		this.velocity['x'] = (rotatedX * this.speed);
		this.velocity['y'] = (rotatedY * this.speed);

		this.position[1] = this.position[1] + this.velocity['x'];
		this.position[0] = this.position[0] - this.velocity['y'];

		if(this.position[1] < 0){
			this.position[1] = 799;
		}else if(this.position[1] > 800){
			this.position[1] = 1;
		}else if(this.position[0] < 0){
			this.position[0] = 799;
		}else if(this.position[0] > 800){
			this.position[0] = 1;
		};

		ctx.moveTo(this.position[1], this.position[0]);

		var rotatedX = (-12)*Math.cos(this.rotation) - (15)*Math.sin(this.rotation);
		var rotatedY = (-12)*Math.sin(this.rotation) + (15)*Math.cos(this.rotation);
		ctx.lineTo(this.position[1] + rotatedX, this.position[0] + rotatedY);

		rotatedX = (19.2093727123)*Math.sin(this.rotation);
		rotatedY = (-19.2093727123)*Math.cos(this.rotation);
		ctx.lineTo(this.position[1] + rotatedX, this.position[0] + rotatedY);

		rotatedX = (12)*Math.cos(this.rotation) - (15)*Math.sin(this.rotation);
		rotatedY = (12)*Math.sin(this.rotation) + (15)*Math.cos(this.rotation);
		ctx.lineTo(this.position[1] + rotatedX, this.position[0] + rotatedY);

		ctx.lineTo(this.position[1], this.position[0]);
		ctx.fill();
		ctx.stroke();
		ctx.closePath();
	};

	this.fireBullet = function() {
    this.bullets.push(new Bullet(this));
    console.log(this.bullets);
  };

	this.isHit = function(asteroids) {
		for(var i = 0; i < asteroids.length; i++){
			if(distance(this.position, asteroids[i].position) < (this.radius + asteroids[i].radius)){
				return true;
			}	
		}
	};
};

function Bullet (ship){
  this.position = ship.position;
  this.radius = 2
  
  this.velocity = {x: Math.sin(ship.rotation), y: Math.cos(ship.rotation)};
  this.speed = Math.sqrt(Math.pow(this.velocity['x'], 2) + Math.pow(this.velocity['y'], 2));

  this.draw = function(ctx) {
    console.log(this.position);
    ctx.fillStyle = "FF0000";
    ctx.beginPath();
    ctx.arc(this.position[1],this.position[0], this.radius, 0, 2*Math.PI);
    ctx.fill();
  };

  this.update = function() {

    this.position = [this.position[0] + this.velocity['x']*this.speed,
                     this.position[1] + this.velocity['y']*this.speed];
 	};
}




