var listeners = function(game) { 
	$('html').keydown(function(event) {
		switch(event.keyCode){
			case 37:
			game.ship.fireBullet();
		}
	});
};

$(document).ready(function(){
	var canvas = document.getElementById('asteroidsGame');
	var ctx = canvas.getContext('2d');
	var game = new Game(ctx);
	game.start();

	listeners(game);




});