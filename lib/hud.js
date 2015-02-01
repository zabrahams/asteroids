(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {}
  }

  var Hud = Asteroids.Hud = function () {
    this.lives = 5;
    this.score = 0;
  };

  Hud.DIM_X = 700;
  Hud.DIM_Y = 100;
  Hud.RADIUS = 15;


  Hud.prototype.draw = function (hudCtx) {
    var hud = this;
    var lifeLocs = this.getLocs(this.lives, 3*Hud.DIM_Y/4);
    var scoreLocs = this.getLocs(this.score, Hud.DIM_Y/4);
    this.drawBackground(hudCtx);
    lifeLocs.forEach(function (loc) {
      hud.drawCircle(
        hudCtx,
        loc,
        Asteroids.Ship.COLOR,
        Asteroids.Ship.INNER_COLOR,
        Asteroids.Ship.COLOR);
    });

    scoreLocs.forEach(function (loc) {
      hud.drawCircle(
        hudCtx,
        loc,
        Asteroids.Asteroid.INNER_COLOR,
        Asteroids.Asteroid.SHADOW_COLOR,
        Asteroids.Asteroid.OUTER_COLOR);
    });
  };

  Hud.prototype.drawBackground = function (hudCtx) {
    var colors = ["#e16552", "#f19670", "#e2975d"]

    bar_height = Hud.DIM_Y/colors.length;
    for (var i = 0; i < colors.length; i++) {
      hudCtx.fillStyle = colors[i];
      hudCtx.fillRect(0, (i*bar_height), Hud.DIM_X, bar_height);
    }
  };

  Hud.prototype.drawCircle = function (hudCtx, loc, innerCol, shadowCol, outlineCol) {
      hudCtx.fillStyle = innerCol;
      hudCtx.strokeStyle = outlineCol;
      hudCtx.beginPath();

      hudCtx.arc(
        loc[0],
        loc[1],
        Hud.RADIUS,
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
        Hud.RADIUS - 2,
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
        locs.push([Hud.DIM_X/2, yVal]);
      } else if (i % 2 === 0) {
        var xVal = Hud.DIM_X/2 + (i-1)*2*Hud.RADIUS;
        locs.push([xVal, yVal]);
      } else {
        var xVal = Hud.DIM_X/2 - (i*2*Hud.RADIUS);
        locs.push([xVal, yVal]);
      }
    }

    return locs;
  };



})();
