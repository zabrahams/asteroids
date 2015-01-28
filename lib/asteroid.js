(function () {
  if ( typeof window.Asteroids === "undefined") {
      window.Asteroids = {};
  }

  Asteroid = Asteroids.Asteroid = function (options) { // takes in pos, game)
      options.vel = Asteroids.Util.randomVel();
      options.angle = Asteroids.Util.randomAngle();
      options.radius = Asteroid.randRadius();
      Asteroids.MovingObject.call(this, options); // calls parent constructor with pos, game
      this.outerColor = Asteroid.OUTER_COLOR;
      this.innerColor = Asteroid.INNER_COLOR;
      this.shadowColor = Asteroid.SHADOW_COLOR;
  };

  Asteroid.OUTER_COLOR = "#8e8c6d";
  Asteroid.INNER_COLOR = "#74c493";
  Asteroid.SHADOW_COLOR = "#65bd87";
  Asteroid.SMALL_RADIUS = 10;
  Asteroid.BIG_RADIUS = 100;

  Asteroids.Util.inherits.call(Asteroid, Asteroids.MovingObject);

  Asteroid.randRadius = function () {
    return Math.random() * (Asteroid.BIG_RADIUS - Asteroid.SMALL_RADIUS) + Asteroid.SMALL_RADIUS;
  }

  Asteroid.prototype.collideWith = function (otherObject) {
      if (otherObject.constructor === Asteroids.Ship) {
        otherObject.relocate();
      }
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.fillStyle = this.innerColor;
    ctx.strokeStyle = this.outerColor;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle)

    ctx.lineWidth = 1;
    ctx.fillStyle = this.shadowColor;
    ctx.beginPath();

    ctx.arc(
      0,
      0,
      this.radius - 2,
      Math.PI,
      2 * Math.PI,
      false
    );

    ctx.fill();
    ctx.restore();
  };

})();
