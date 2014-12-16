(function () {
  if (typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
  };

  Game.DIM_X = 900;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 10;

  Game.prototype.addAsteroids = function () {
      for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroid( { pos: Game.randomPosition() } ));
      }
  };

  Game.prototype.draw = function (ctx) {
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      for (var i = 0; i < this.asteroids.length; i++) {
        this.asteroids[i].draw(ctx);
      }
  };

  Game.prototype.moveObjects = function () {
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
    }
  };

  Game.randomPosition = function () {
      var x = Math.floor(Math.random() * Game.DIM_X);
      var y = Math.floor(Math.random() * Game.DIM_Y);

      return [x, y];
  };




})();
