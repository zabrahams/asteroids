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
        if (otherObject.isHit === false && otherObject.hits <= 0) {
          otherObject.explode();
        } else if (otherObject.isHit == false) {
            otherObject.hits --;
            otherObject.isHit = true;
            Animations.pulse({
              obj: otherObject,
              change: 5,
              frames: 10,
              callback: function () {
                console.log(otherObject.currAnimations);
                otherObject.isHit = false;
              }
            });

            Animations.sizePulse({
              obj: otherObject,
              change: 2,
              frames: 10,
              callback: function () {
                console.log(otherObject.currAnimations);
                // otherObject.isHit = false;
              }
            });
          }
        this.game.remove(this);
      }
    };

    Bullet.prototype.isWrappable = false;

})();
