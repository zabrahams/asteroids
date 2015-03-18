(function () {
  if ( typeof window.Asteroids === "undefined") {
      window.Asteroids = {};
  }

  Asteroid = Asteroids.Asteroid = function (options) { // takes in pos, game)
      options.vel = Asteroids.Util.randomVel();
      options.angle = Asteroids.Util.randomAngle();
      options.radius = options.radius || Asteroid.randRadius();
      Asteroids.MovingObject.call(this, options); // calls parent constructor with pos, game
      this.outerColor = new Color(Asteroid.OUTER_COLOR);
      this.innerColor = new Color(Asteroid.INNER_COLOR);
      this.shadowColor = new Color(Asteroid.SHADOW_COLOR);
      this.isHit = false;
      this.hits = Asteroid.HITS;
  };

  Asteroids.Util.inherits.call(Asteroid, Asteroids.MovingObject);

  Asteroid.CHILDREN = 2;
  Asteroid.OUTER_COLOR = "#8e8c6d";
  Asteroid.INNER_COLOR = "#74c493";
  Asteroid.SHADOW_COLOR = "#65bd87";
  // Asteroid.SMALL_RADIUS = 20;
  // Asteroid.BIG_RADIUS = 120;
  Asteroid.HITS = 3;

  Asteroid.setRadii = function(DIM_X) {
    Asteroid.SMALL_RADIUS = DIM_X/45;
    Asteroid.BIG_RADIUS = DIM_X/7.5;
  };

  Asteroid.spawn = function (pos, game) {
    asteroid = new Asteroid({pos: pos, radius: 5, game: game})
    game.asteroids.push(asteroid);

    Animations.changeSize({
      obj: asteroid,
      change: 1,
      frames: Asteroid.randRadius() - 5
    });
  };

  Asteroid.randRadius = function () {
    return Math.random() * (Asteroid.BIG_RADIUS - Asteroid.SMALL_RADIUS) + Asteroid.SMALL_RADIUS;
  };

  Asteroid.prototype.collideWith = function (otherObject) {
      if (otherObject.constructor === Asteroids.Ship &&   otherObject.dying === false) {
      otherObject.takeHit();
      }
  };

  Asteroid.prototype.explode = function () {
    var astr = this;
//
    Animations.changeSize({
      obj: astr,
      change: -1,
      frames: this.radius - 5,
      callback: function () {
        astr.game.hud.scorePoint();
        for (var i = 0; i < Asteroid.CHILDREN; i ++) {
          Asteroid.spawn(astr.pos, astr.game);
        }
        astr.game.remove(astr);
      }
    });
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.fillStyle = this.innerColor.value;
    ctx.strokeStyle = this.outerColor.value;
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

    this.drawInnerHalfCircle(ctx);
  };


  Asteroid.prototype.drawInnerHalfCircle = function (ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.angle)

    ctx.lineWidth = 1;
    ctx.fillStyle = this.shadowColor.value;
    ctx.beginPath();

    if (this.radius < 5) {
      this.radius = 5;
    }

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
