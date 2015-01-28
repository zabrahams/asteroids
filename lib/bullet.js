(function () {
    if (typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var Bullet = Asteroids.Bullet = function ( options ) {
        options.color = new Color(Bullet.COLOR)
        Asteroids.MovingObject.call(this, options);

    }

    Bullet.COLOR = "#51574a";

    Asteroids.Util.inherits.call(Bullet, Asteroids.MovingObject);

    Bullet.prototype.collideWith = function (otherObject) {
        if (otherObject.constructor === Asteroids.Asteroid) {
          if (otherObject.constructor === Asteroids.Asteroid) {
            Animations.pulse({
              obj: otherObject,
              change: 20,
              frames: 5
            });
          }
          this.game.remove(this);
        }
    };


    Bullet.prototype.isWrappable = false;

})();
