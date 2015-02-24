(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {}
  }

  Asteroids.start_game = function () {

    var hudEl = document.getElementById("hud-canvas");
    var hud = new Asteroids.Hud()
    var hudCtx = hudEl.getContext("2d");

    var canvasEl = document.getElementById("game-canvas");
    var game = new Asteroids.Game(hud);
    var ctx = canvasEl.getContext("2d");
    hud.setDimensions(game);

    canvasEl.height = game.DIM_Y;
    canvasEl.width = game.DIM_X;
    hudEl.height = hud.DIM_Y;
    hudEl.width = hud.DIM_X;

    var gameView = new Asteroids.GameView(game, ctx, hud, hudCtx);
    gameView.start();
  }

  Asteroids.restart_game = function (gameView) {
    gameView.hud = new Asteroids.Hud();
    gameView.game = new Asteroids.Game(gameView.hud);
  };

})();
