var listeners = function(game) { 
	$('html').keydown(function(event) {
		switch(event.keyCode){
			case 32:
			game.ship.fireBullet();
			break;
			case 38:
			if(game.ship.speed < 4){
				game.ship.speed += 0.3;
			}
			break;
			case 39:
			game.ship.rotation += 0.2;
			break;
			case 37:
			game.ship.rotation -= 0.2;
			break;
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