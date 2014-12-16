(function () {
  if ( typeof window.Asteroids === "undefined") {
      window.Asteroids = {};
  }

  Asteroid = Asteroids.Asteroid = function (asterArgs) {
      this.pos = asterArgs["pos"];
      this.vel = Asteroids.Util.randomVec(100);
      this.color = asterArgs["color"] || Asteroid.COLOR;
      this.radius = asterArgs["radius"] || Asteroid.RADIUS;
  };

  Asteroid.COLOR = "#00FF00";
  Asteroid.RADIUS = 50;

  Asteroids.Util.inherits.call(Asteroid, Asteroids.MovingObject);

})();
