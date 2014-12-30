(function () {
    if ( typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }

    var GameView = Asteroids.GameView = function (game, ctx) {
        this.game = game;
        this.ctx = ctx;
    };

    GameView.prototype.start = function () {
      var that = this;
        // this.bindKeyHandlers();
        setInterval( function () {
            that.game.step();
            that.game.draw(this.ctx);
            that.checkInput();
        }, 15);
        setInterval( function () {
            this.game.ship.decelerate();
        }, 200);
    };

    GameView.prototype.checkInput = function () {
      var ship = this.game.ship;
      if (key.isPressed('up')) {
        ship.power(0.5);
      }
      if (key.isPressed('down')) {
        ship.power(-0.5);
      }
      if (key.isPressed('left')) {
        ship.rotate(-0.1);
      }
      if (key.isPressed('right')) {
        ship.rotate(0.1);
      }
      if (key.isPressed('space')) {
        ship.fireBullet();
      }
    };

})();
