var listeners = function() { 
	$('html').keydown(function(event) {
		switch(event.keyCode){
			case 37:
			game.ship.velocity += 0.2;
			break;
			case 39:
			game.ship.rotate = [0,1];
			break;
			case 40:
			game.ship.rotate = [1,0];
			break;
		}
	}
};

$(document).ready(function(){
	var canvas = document.getElementById('asteroidsGame');
	var ctx = canvas.getContext('2d');
	var game = new Game(ctx);
	game.start();

	listeners(game);




});