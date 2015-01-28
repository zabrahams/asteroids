(function () {
    if (typeof window.Asteroids === "undefined") {
        window.Asteroids = {};
    }

    var MovingObject = Asteroids.MovingObject = function (options) {
        this.pos = options['pos'];
        this.vel = options['vel'];
        this.radius = options['radius'];
        this.color = options['color'];
        this.game = options['game'];
        this.angle = options['angle'];
        this.currAnimations = [];
        this.nextAnimations = [];
    };

    MovingObject.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color.value;
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
    };

    MovingObject.prototype.move = function () {
      this.pos[0] += (Math.cos(this.angle) * this.vel);
      this.pos[1] += (Math.sin(this.angle) * this.vel);
      if (this.isWrappable === true) {
        this.pos = this.game.wrap(this.pos);
      } else {
        if (this.game.isOutOfBounds(this.pos)) {
          this.game.remove(this);
        }
      }
    };


    MovingObject.prototype.isCollidedWith = function (otherObject) {
        var x_dist = Math.abs(this.pos[0] - otherObject.pos[0]);
        var y_dist = Math.abs(this.pos[1] - otherObject.pos[1]);
        var dist = Math.floor(Math.sqrt(Math.pow(x_dist,2) + Math.pow(y_dist,2)));
        var radii_distance = this.radius + otherObject.radius;
        return (dist <= radii_distance)
    };

    MovingObject.prototype.isWrappable = true;

    MovingObject.prototype.collideWith = function (otherObject) {
        // game.remove(otherObject);
        // game.remove(this);
    };

})();
