(function () {
  if ( typeof window.Asteroids === "undefined") {
      window.Asteroids = {};
  }

  Asteroid = Asteroids.Asteroid = function (options) { // takes in pos, game)
      options.vel = Asteroids.Util.randomVec(10);
      options.color = Asteroid.COLOR;
      options.radius = Asteroid.RADIUS;
      Asteroids.MovingObject.call(this, options); // calls parent constructor with pos, game
  };

  Asteroid.COLOR = "#00FF00";
  Asteroid.RADIUS = 50;

  Asteroids.Util.inherits.call(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
      if (otherObject.constructor === Asteroids.Ship) {
        otherObject.relocate();
      }
  };


})();
