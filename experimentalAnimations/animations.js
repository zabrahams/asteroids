var AnimationView = function (ctx) {
  this.objects = [];
  this.ctx = ctx;
  setInterval(this.step.bind(this), 15);
};

AnimationView.prototype.step = function () {
  var aniView = this;
  this.objects.forEach( function (object) {
    object.currAnimations.forEach (function (animation) {
      animation.call(object);
    });
    object.draw(aniView.ctx);
    object.currAnimations = object.nextAnimations;
    object.nextAnimations = [];
  });
}

var Animations = {};

Animations.brighten = function (obj, change, frames, callback) {
  var _brighten = function _brighten () {
    obj.color.brighten(change);
    console.log(obj.color.value);
    if (frames > 0) {
      frames -= 1;
      obj.nextAnimations.push(_brighten);
    } else {
      callback && callback();
    }
  };

  obj.nextAnimations.push(_brighten);
};

Animations.pulse = function (obj, change, frames, callback) {
  var darkenFrames = frames;
  var darkenChange = change * -1;
  Animations.brighten(obj, change, frames, function () {
    Animations.brighten(obj, darkenChange, darkenFrames, callback);
  });
};

var Circle = function (pos){
  this.pos = pos;
  this.color = new Color(Circle.COLOR);
  this.radius = Circle.RADIUS;
  this.currAnimations = [];
  this.nextAnimations = []
};

Circle.COLOR = "#40aa40";
Circle.RADIUS = 40;

Circle.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color.value;
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
