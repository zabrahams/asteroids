(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {}
  }

  var Hud = Asteroids.Hud = function () {
    this.lives = 5;
    this.score = 0;
    this.dying = false;
  };

  Hud.prototype.setDimensions = function (game) {
    this.DIM_X = game.DIM_X * 7/9;
    this.DIM_Y = game.DIM_Y * 1/6;
    this.RADIUS = game.DIM_X/60;
    this.lastLifeRadius = this.RADIUS;
    this.lastScoreRadius = this.RADIUS;
  }

  Hud.prototype.draw = function (hudCtx) {
    var hud = this;
    var lifeLocs = this.getLocs(this.lives, 3*this.DIM_Y/4);
    var scoreLocs = this.getLocs(this.score, this.DIM_Y/4);


    this.drawBackground(hudCtx);

    lifeLocs.slice(0, -1).forEach(function (loc) {
      hud.drawCircle(
        hudCtx,
        loc,
        hud.RADIUS,
        Asteroids.Ship.COLOR,
        Asteroids.Ship.INNER_COLOR,
        Asteroids.Ship.COLOR);
    });

    if (lifeLocs.length > 0) {
      hud.drawCircle(
        hudCtx,
        lifeLocs[lifeLocs.length - 1],
        hud.lastLifeRadius,
        Asteroids.Ship.COLOR,
        Asteroids.Ship.INNER_COLOR,
        Asteroids.Ship.COLOR);
    }

    scoreLocs.slice(0, -1).forEach(function (loc) {
      hud.drawCircle(
        hudCtx,
        loc,
        hud.RADIUS,
        Asteroids.Asteroid.INNER_COLOR,
        Asteroids.Asteroid.SHADOW_COLOR,
        Asteroids.Asteroid.OUTER_COLOR);
    });


    if (scoreLocs.length > 0) {
      hud.drawCircle(
        hudCtx,
        scoreLocs[scoreLocs.length - 1],
        hud.lastScoreRadius,
        Asteroids.Asteroid.INNER_COLOR,
        Asteroids.Asteroid.SHADOW_COLOR,
        Asteroids.Asteroid.OUTER_COLOR
      )
    }

    if (this.lastScoreRadius < this.RADIUS) {
      this.lastScoreRadius++;
    }

    if (this.dying === true) {
      this.lastLifeRadius--;
      if (this.lastLifeRadius <= 5) {
        this.lives--;
        this.dying = false;
        this.lastLifeRadius = this.RADIUS;
      }
    }
  };

  Hud.prototype.drawBackground = function (hudCtx) {
    var colors = ["#e16552", "#f19670", "#e2975d"]

    var bar_height = this.DIM_Y/colors.length;
    for (var i = 0; i < colors.length; i++) {
      hudCtx.fillStyle = colors[i];
      hudCtx.fillRect(0, (i*bar_height), this.DIM_X, bar_height);
    }
  };

  Hud.prototype.drawCircle = function (hudCtx, loc, radius, innerCol, shadowCol, outlineCol) {
      hudCtx.fillStyle = innerCol;
      hudCtx.strokeStyle = outlineCol;
      hudCtx.beginPath();

      hudCtx.arc(
        loc[0],
        loc[1],
        radius,
        0,
        2 * Math.PI,
        false
      );

      hudCtx.fill();
      hudCtx.stroke();

      hudCtx.fillStyle = shadowCol;
      hudCtx.beginPath();

      hudCtx.arc(
        loc[0],
        loc[1],
        radius - 2,
        Math.PI/2,
        3 * Math.PI/2,
        false
      );

      hudCtx.fill();
    };

  Hud.prototype.getLocs = function (num, yVal) {
    var locs  = [];
    for (var i = 0; i < num; i++){
      if (i === 0) {
        locs.push([this.DIM_X/2, yVal]);
      } else if (i % 2 === 0) {
        var xVal = this.DIM_X/2 + (i-1)*2*this.RADIUS;
        locs.push([xVal, yVal]);
      } else {
        var xVal = this.DIM_X/2 - (i*2*this.RADIUS);
        locs.push([xVal, yVal]);
      }
    }

    return locs;
  };

  Hud.prototype.scorePoint = function () {
    this.score++;
    this.lastScoreRadius = 5;
  }

  Hud.prototype.loseLife = function () {
    this.dying = true;
  }


})();
