(function () {
  if (typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (hud) {
    this.setDimensions();
    Asteroid.setRadii(this.DIM_X);
    this.bulletCounter = 0;
    this.asteroids = [];
    this.addAsteroids();
    this.bullets = [];
    this.ship = new Asteroids.Ship( {
        vel: 0,
        pos: this.randomPosition(),
        game: this
    });
    this.hud = hud;
  };

  Game.MAX_VEL = 5;
  Game.NUM_ASTEROIDS = 1;

  Game.prototype.setDimensions = function () {
    var aspectRatio = window.innerWidth/(window.innerHeight * 3/4);
    if (aspectRatio >= 1.5) {
      this.DIM_Y = window.innerHeight * 3/4;
      this.DIM_X = this.DIM_Y * 3/2;
    } else {
      this.DIM_X = window.innerWidth;
      this.DIM_Y = this.DIM_X * 2/3;
    }

    if (this.DIM_X < 360) {
      this.DIM_X = 360;
      this.DIM_Y = 240;
    }
  }

  Game.prototype.addAsteroids = function () {
      var _game = this
      for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
        this.asteroids.push(new Asteroid( { pos: this.randomPosition(), game: _game } ));
      }
  };

  Game.prototype.draw = function (ctx) {
      var objects = this.allObjects();
      ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
      this.drawBackground(ctx);
      for (var i = 0; i < objects.length; i++) {
        objects[i].draw(ctx);
      }
  };

  Game.prototype.drawBackground = function (ctx) {
    var colors = ["#e2975d", "#f19670", "#e16552", "#c94a53", "#be5168"];
    var stripeWidth = this.DIM_X/colors.length;
    for ( i = 0; i < colors.length; i++) {
      ctx.fillStyle = colors[i];
      ctx.fillRect(0 + (stripeWidth*i), 0, stripeWidth, this.DIM_Y);
    }
  };

  Game.prototype.moveObjects = function () {
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      objects[i].move();
    }
  };

  Game.prototype.randomPosition = function () {
      var x = Math.floor(Math.random() * this.DIM_X);
      var y = Math.floor(Math.random() * this.DIM_Y);

      return [x, y];
  };

  Game.prototype.wrap = function (pos) {
    var x = (pos[0] > this.DIM_X) ? (pos[0] - this.DIM_X) : pos[0];
    var y = (pos[1] > this.DIM_Y) ? (pos[1] - this.DIM_Y) : pos[1];
    x = (x < 0) ? (x + this.DIM_X) : x;
    y = (y < 0) ? (y + this.DIM_Y) : y;
    return [x,y]
  };

  Game.prototype.checkCollisions = function () {
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      for (var j = 0; j < objects.length; j++) {
        if ((i != j) && (objects[i].isCollidedWith(objects[j]))) {
          objects[i].collideWith(objects[j]);
        }
      }
    }
  };

  Game.prototype.step = function (ctx) {
    var objects = this.allObjects();

    this.moveObjects();
    this.checkCollisions();
    if (this.bulletCounter > 0) {
      this.bulletCounter--;
    }
    for (var i=0; i < objects.length; i++) {
      var object = objects[i];
      object.currAnimations.forEach (function (animation) {
        animation.call(object);
      });
      object.currAnimations = object.nextAnimations;
      object.nextAnimations = [];
    }
  };

  Game.prototype.remove = function (object) {
    var obj_array;
    if (object.constructor === Asteroids.Asteroid) {
      obj_array = this.asteroids;
    }else{
      obj_array = this.bullets;
    }
    var index = obj_array.indexOf(object);
    obj_array.splice(index, 1);
  };

  Game.prototype.allObjects = function () {
      if (this.ship) {
        return (this.asteroids.concat(this.bullets).concat([this.ship]));
      } else {
        return (this.asteroids.concat(this.bullets));
      }
  };

  Game.prototype.isOutOfBounds = function (pos) {
      return (  pos[0] < 0 ||
                pos[0] > this.DIM_X ||
                pos[1] < 0 ||
                pos[1] > this.DIM_Y );
  };

  Game.prototype.scorePoint = function () {
    this.hud.scorePoint();
  }

  Game.prototype.isOver = function () {
    return !this.ship;
  }

  Game.prototype.drawRestartButton = function (ctx, radius, inner, outer) {
    ctx.fillStyle = inner;
    ctx.strokeStyle = outer;
    ctx.beginPath();

    ctx.arc(
      this.DIM_X/2,
      this.DIM_Y/2,
      radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
      this.DIM_X/2 - 20,
      this.DIM_Y/2,
      15,
      7 * Math.PI/4,
      Math.PI/4,
      true
    );

    ctx.arc(
      this.DIM_X/2 + 20,
      this.DIM_Y/2,
      15,
      5 * Math.PI/4,
      3 * Math.PI/4,
      false
    );

    ctx.stroke();
};



})();
