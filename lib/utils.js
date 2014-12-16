(function () {
    if (typeof window.Asteroids === "undefined") {
        window.Asteroids = {};
    }

    if (typeof window.Asteroids.Util === "undefined") {
        window.Asteroids.Util = {};
    }

    Asteroids.Util.inherits = function (ParentClass) {
      var Surrogate = function () {};
      Surrogate.prototype = ParentClass.prototype;
      this.prototype = new Surrogate();
      this.prototype.constructor = this;       // Cat.constructor === Cat  is true!
    };

    Asteroids.Util.randomVec = function (length) {
        var x = Math.floor(Math.random() * length);
        var y = Math.floor(Math.random() * length);
        return [x, y];
    };

})();
