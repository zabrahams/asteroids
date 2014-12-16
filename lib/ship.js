(function () {
    if (typeof window.Asteroids === "undefined" ) {
        window.Asteroids = {};
      }

    var Ship = Asteroids.Ship = function (shipArgs) {
        Asteroids.MovingObject.call(this, shipArgs);
        this.radius = shipArgs['radius'] || Ship.RADIUS;
        this.color = shipArgs['color'] || Ship.COLOR;
    };

    Ship.RADIUS = 15;
    Ship.COLOR = "#FF0000"

    Asteroids.Util.inherits.call(Ship, Asteroids.MovingObject);

    Ship.prototype.relocate = function () {
        this.pos = Asteroids.Game.randomPosition();
        this.vel = [0,0];
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
            vel: [this.vel[0]*2,this.vel[1]*2],
            pos: this.pos.slice(),
            color: "#FFFFFF",
            game: this.game,
            radius: 3
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
