(function () {
    if ( typeof window.Asteroids === "undefined" ) {
      window.Asteroids = {};
    }


    var GameView = Asteroids.GameView = function (game, ctx, hud, hudCtx) {
        var that = this;
        this.game = game;
        this.ctx = ctx;
        this.hud = hud;
        this.hudCtx = hudCtx;
        this.restartRadius = 1;
        this.canvasEl = document.getElementById("game-canvas")
        this.canvasEl.addEventListener("mousemove", function (event) {
          that.mouseX = event.clientX;
          that.mouseY = event.clientY;
        });
        this.canvasEl.addEventListener("click", function (event) {
          if (that.game.isOver() &&
              event.clientX >= Asteroids.Game.DIM_X/2 - 50 + that.canvasEl.offsetLeft &&
              event.clientX <= Asteroids.Game.DIM_X/2 + 50 + that.canvasEl.offsetLeft &&
              event.clientY >= Asteroids.Game.DIM_Y/2 - 50 + that.canvasEl.offsetTop &&
              event.clientY <= Asteroids.Game.DIM_Y/2 + 50 + that.canvasEl.offsetTop) {
            that.restartRadius = 1;
            Asteroids.restart_game(that);
          }
        });

    };

    GameView.prototype.start = function () {
      var that = this;
        setInterval( function () {
            that.game.step(that.ctx);
            that.game.draw(that.ctx);
            that.setupRestartButton();
            that.hud.draw(that.hudCtx);
            that.checkInput();
        }, 15);
        setInterval( function () {
            that.game.ship && that.game.ship.decelerate();
        }, 200);
    };

    GameView.prototype.checkInput = function () {
      var ship = this.game.ship;
      if (key.isPressed('up')) {
        ship && ship.power(0.5);
      }
      if (key.isPressed('down')) {
        ship && ship.power(-0.5);
      }
      if (key.isPressed('left')) {
        ship && ship.rotate(-0.1);
      }
      if (key.isPressed('right')) {
        ship && ship.rotate(0.1);
      }
      if (key.isPressed('space')) {
        ship && ship.fireBullet();
      }

      // For debugging
      if (key.isPressed('x')) {
        delete this.game.ship;
      }
    };

    GameView.prototype.setupRestartButton = function () {
      if (this.game.isOver()) {
        if (this.restartRadius < 50) {
          this.restartRadius++;
        }
        if (this.mouseX >= Asteroids.Game.DIM_X/2 - 50 + this.canvasEl.offsetLeft &&
            this.mouseX <= Asteroids.Game.DIM_X/2 + 50 + this.canvasEl.offsetLeft &&
            this.mouseY >= Asteroids.Game.DIM_Y/2 - 50 + this.canvasEl.offsetTop &&
            this.mouseY <= Asteroids.Game.DIM_Y/2 + 50 + this.canvasEl.offsetTop) {
          this.game.drawRestartButton(this.ctx, this.restartRadius, Asteroids.Ship.COLOR, Asteroids.Ship.INNER_COLOR);

        } else {
          this.game.drawRestartButton(this.ctx, this.restartRadius);
        }
      }
    };

})();
