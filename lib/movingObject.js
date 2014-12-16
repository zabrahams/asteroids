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



})();
