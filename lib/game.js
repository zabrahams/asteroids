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
  Game.NUM_ASTEROIDS = 20;

  Game.prototype.addAsteroids = function () {
      var _game = this
      for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroid( { pos: Game.randomPosition(), game: _game } ));
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

  Game.prototype.wrap = function (pos) {
    var x = (pos[0] > Game.DIM_X) ? (pos[0] - Game.DIM_X) : pos[0];
    var y = (pos[1] > Game.DIM_Y) ? (pos[1] - Game.DIM_Y) : pos[1];
    return [x,y]
  };

  Game.prototype.checkCollisions = function () {
    var asteroids = this.asteroids
    for (var i = 0; i < asteroids.length; i++) {
      for (var j = 0; j < asteroids.length; j++) {
        if ((i != j) && (asteroids[i].isCollidedWith(asteroids[j]))) {
          asteroids[i].collideWith(asteroids[j]);
        }
      }
    }
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {
    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);
  };



})();
