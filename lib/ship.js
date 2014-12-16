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
        this.vel[0] += impulse[0];
        this.vel[1] += impulse[1];
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

})();
