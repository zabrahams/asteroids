(function () {
    if (typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var Bullet = Asteroids.Bullet = function ( options ) {
        Asteroids.MovingObject.call(this, options);
        this.angle = options.angle
    }

    Asteroids.Util.inherits.call(Bullet, Asteroids.MovingObject);

    Bullet.prototype.move = function () {
      this.pos[0] += (Math.cos(this.angle) * this.vel[1]);
      this.pos[1] += (Math.sin(this.angle) * this.vel[1]);
      if (this.game.isOutOfBounds(this.pos)) {
        this.game.remove(this);
      }
    };


    Bullet.prototype.collideWith = function (otherObject) {
        if (otherObject.constructor === Asteroids.Asteroid) {
            this.game.remove(otherObject);
            this.game.remove(this);
        }
    };


    Bullet.prototype.isWrappable = false;

})();
