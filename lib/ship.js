(function () {
    if (typeof window.Asteroids === "undefined" ) {
        window.Asteroids = {};
      }

    var Ship = Asteroids.Ship = function (options) {
        options.radius = Ship.RADIUS;
        options.color =  Ship.COLOR;
        Asteroids.MovingObject.call(this, options);
        this.angle = Ship.START_ANGLE;
    };

    Ship.START_ANGLE = 3*(Math.PI/2);
    Ship.RADIUS = 15;
    Ship.COLOR = "#FF0000"

    Asteroids.Util.inherits.call(Ship, Asteroids.MovingObject);

    Ship.prototype.draw = function (ctx) {
      Asteroids.MovingObject.prototype.draw.call(this, ctx);

      ctx.save();
      ctx.translate(this.pos[0], this.pos[1]);
      ctx.rotate(this.angle)


      ctx.moveTo(0 - this.radius, 0)  // Since we begin rotated 90, the line is drawn
      ctx.lineTo(0 + this.radius, 0)  // horizontally on the rotated canvas.
      ctx.strokeStyle = "#000000";
      ctx.stroke();
      ctx.restore();
    };

    Ship.prototype.relocate = function () {
        this.pos = Asteroids.Game.randomPosition();
        this.vel = [0,0];
    };

    Ship.prototype.rotate = function (rad) {
      this.angle = (this.angle + rad) % (Math.PI*2);
    }

    Ship.prototype.move = function () {
      this.pos[0] += (Math.cos(this.angle) * this.vel[1]);
      this.pos[1] += (Math.sin(this.angle) * this.vel[1]);
      if (this.isWrappable === true) {
        this.pos = this.game.wrap(this.pos);
      } else {
        if (this.game.isOutOfBounds(this.pos)) {
          this.game.remove(this);
        }
      }
    };

    Ship.prototype.power = function (impulse) {
        if (Math.abs(this.vel[0]) < 10) {
          this.vel[0] += impulse[0];
        }
        if (Math.abs(this.vel[1]) < 10) {
          this.vel[1] += impulse[1];
        }
    };

    Ship.prototype.fireBullet = function () {
        this.game.bullets.push(new Asteroids.Bullet( {
            vel: [0, ((Math.abs(this.vel[1])+1) *2)],
            pos: this.pos.slice(),
            color: "#FFFFFF",
            game: this.game,
            radius: 3,
            angle: this.angle
        }));
    };

    Ship.prototype.deccelerate = function () {
      for (var i = 0; i < this.vel.length; i++) {
        this.vel[i] = Ship.deccelerateComp(this.vel[i]);
      }

    };

    Ship.deccelerateComp = function (velComp) {
      if (velComp === 0) {
        return 0;
      }
      return  (-1 * (velComp/(Math.abs(velComp)))) + velComp;
    }

})();
