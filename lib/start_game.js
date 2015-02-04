(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {}
  }

  Asteroids.start_game = function () {
    var canvasEl = document.getElementById("game-canvas");
    canvasEl.height = Asteroids.Game.DIM_Y;
    canvasEl.width = Asteroids.Game.DIM_X;
    var ctx = canvasEl.getContext("2d");

    var hudEl = document.getElementById("hud-canvas");
    hudEl.height = Asteroids.Hud.DIM_Y;
    hudEl.width = Asteroids.Hud.DIM_X;
    var hudCtx = hudEl.getContext("2d");

    var hud = new Asteroids.Hud()
    var game = new Asteroids.Game(hud);
    var gameView = new Asteroids.GameView(game, ctx, hud, hudCtx);
    gameView.start();
  }

  Asteroids.restart_game = function (gameView) {
    gameView.hud = new Asteroids.Hud();
    gameView.game = new Asteroids.Game(gameView.hud);
  };

})();
