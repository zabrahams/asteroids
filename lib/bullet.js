(function () {
    if (typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var Bullet = Asteroids.Bullet = function ( options ) {
        options.color = Bullet.COLOR
        Asteroids.MovingObject.call(this, options);

    }

    Bullet.COLOR = "#51574a";

    Asteroids.Util.inherits.call(Bullet, Asteroids.MovingObject);

    Bullet.prototype.collideWith = function (otherObject) {
        if (otherObject.constructor === Asteroids.Asteroid) {
          if (otherObject.constructor === Asteroids.Asteroid) {
            otherObject.radius += 2;
          }
          this.game.remove(this);
        }
    };


    Bullet.prototype.isWrappable = false;

})();
