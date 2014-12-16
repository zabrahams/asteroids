(function () {
    if (typeof window.Asteroids === "undefined") {
        window.Asteroids = {};
    }

    var MovingObject = Asteroids.MovingObject = function (argObj) {
        this.pos = argObj['pos'];
        this.vel = argObj['vel'];
        this.radius = argObj['radius'];
        this.color = argObj['color'];
        this.game = argObj['game'];
    };

    MovingObject.prototype.draw = function (ctx) {
        ctx.fillStyle = this.color;
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
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];
      this.pos = this.game.wrap(this.pos);
    };

    MovingObject.prototype.isCollidedWith = function (otherObject) {
        var x_dist = Math.abs(this.pos[0] - otherObject.pos[0]);
        var y_dist = Math.abs(this.pos[1] - otherObject.pos[1]);
        var dist = Math.floor(Math.sqrt(Math.pow(x_dist,2) + Math.pow(y_dist,2)));
        var radii_distance = this.radius + otherObject.radius;
        return (dist <= radii_distance)
    };

    MovingObject.prototype.collideWith = function (otherObject) {
        // game.remove(otherObject);
        // game.remove(this);
    };

})();
