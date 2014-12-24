(function () {
    if (typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var Bullet = Asteroids.Bullet = function ( options ) {
        Asteroids.MovingObject.call(this, options);
        this.angle = options.angle
    }

    Asteroids.Util.inherits.call(Bullet, Asteroids.MovingObject);

    Bullet.prototype.collideWith = function (otherObject) {
        if (otherObject.constructor === Asteroids.Asteroid) {
            this.game.remove(otherObject);
            this.game.remove(this);
        }
    };


    Bullet.prototype.isWrappable = false;

})();
