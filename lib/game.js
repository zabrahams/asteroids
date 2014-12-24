(function () {
  if (typeof window.Asteroids === "undefined"){
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    this.addAsteroids();
    this.bullets = [];
    this.bkg = new Image();
    this.bkg.onload = function () {
        ctx.drawImage(this.bkg, 0, 0);
    };
    this.bkg.src = 'lib/animal-testing-in-space-nasa1.jpg';
    this.ship = new Asteroids.Ship( {
        vel: 0,
        pos: Game.randomPosition(),
        game: this
    });
  };

  Game.MAX_VEL = 10;
  Game.DIM_X = 900;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 4;

  Game.prototype.addAsteroids = function () {
      var _game = this
      for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
        this.asteroids.push(new Asteroid( { pos: Game.randomPosition(), game: _game } ));
      }
  };

  Game.prototype.draw = function (ctx) {
      var objects = this.allObjects();
      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
      ctx.drawImage(this.bkg,-900,-500);
      for (var i = 0; i < objects.length; i++) {
        objects[i].draw(ctx);
      }
  };

  Game.prototype.moveObjects = function () {
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      objects[i].move();
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
    x = (x < 0) ? (x + Game.DIM_X) : x;
    y = (y < 0) ? (y + Game.DIM_Y) : y;
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

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
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
      return ( this.asteroids.concat(this.bullets).concat([this.ship]) );
  };

  Game.prototype.isOutOfBounds = function (pos) {
      return (  pos[0] < 0 ||
                pos[0] > Game.DIM_X ||
                pos[1] < 0 ||
                pos[1] > Game.DIM_Y );
  };



})();
