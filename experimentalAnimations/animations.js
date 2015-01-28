var AnimationView = function (ctx) {
  this.objects = [];
  this.ctx = ctx;
  setInterval(this.step.bind(this), 15);
};

AnimationView.prototype.step = function () {
  var aniView = this;
  aniView.ctx.clearRect(0, 0,  500, 500)
  for (var i=0; i < this.objects.length; i++) {
    var object = this.objects[i];
    object.currAnimations.forEach (function (animation) {
      animation.call(object);
    });
    object.draw.bind(object)(aniView.ctx);
    object.currAnimations = object.nextAnimations;
    console.log(object.color.value);
    object.nextAnimations = [];
  }
};


var Animations = {};

Animations.changeBrightCol = function (options) {
  var obj, color, change, frames, callback;
  obj = options.obj;
  color = options.color;
  change = options.change;
  frames = options.frames;
  callback = options.callback;

  var _changeBright = function _changeBright () {
    if ((obj.color[color] + change <= 255) && (obj.color[color] + change >= 0)) {
      obj.color[color] += change;
      obj.color.update();
    }
    if (frames > 0) {
      frames -= 1;
      obj.nextAnimations.push(_changeBright);
    } else {
      callback && callback();
    }
  };

  obj.nextAnimations.push(_changeBright);
};

Animations.hold = function (options) {
  var obj, frames, callback;
  obj = options.obj;
  frames = options.frames;
  callback = options.callback;

  var _hold = function _hold () {
    if (frames > 0) {
      frames -= 1;
      obj.nextAnimations.push(_hold);
    } else {
      callback && callback();
    }
  };

  obj.nextAnimations.push(_hold);
}


Animations.changeBrightHold = function (options) {
  var obj, color, change, frames, callback;
  obj = options.obj;
  color = options.color;
  change = options.change;
  frames = options.frames;
  callback = options.callback;

  var changeFrames = Animations.getColFrames(obj.color[color], change);
  if (changeFrames > frames) {
    changeFrames = frames;
  }
  var holdFrames = frames - changeFrames;

  // console.log("change frames " + changeFrames)
  // console.log("hold frames " + holdFrames)


  Animations.changeBrightCol({
    obj:      obj,
    color:    color,
    change:   change,
    frames:   changeFrames,
    callback: Animations.hold.bind(this, {
      obj:     obj,
      frames:  holdFrames,
      callback: callback
    })
  });
}
Animations.changeBright = function (options) {
  console.log("change");
  var obj, change, frames, callback;
  obj = options.obj;
  change = options.change;
  frames = options.frames;
  callback = options.callback;

  ["red", "green", "blue"].forEach(function(col) {
    if (col === "blue" || col === "green") {
      callback = undefined;
    }
    console.log(callback);
    Animations.changeBrightHold({
      obj: obj,
      color: col,
      change: change,
      frames: frames,
      callback: callback
    });
  });
};

Animations.pulse = function (options) {
  var frames, darkFrames, change, darkChange, obj, callback

  frames = options.frames
  change = options.change
  obj = options.obj
  callback = options.callback

  darkFrames = frames;
  darkChange = change *-1
  console.log(darkFrames);
  console.log(darkChange);

  Animations.changeBright({
    obj: obj,
    change: change,
    frames: frames,
    callback: function () {
      console.log("in call back");
      Animations.changeBright({
        obj: obj,
        change: darkChange,
        frames: darkFrames,
        callback: callback
    });
  }});
};

Animations.getColFrames = function (value, change) {
  var frames = -1;
  while (value >= 0 && value <= 255) {
    frames ++;
    value += change;
  }

  return frames;
}

Animations.changeSize = function (options) {
  var obj, change, frames, callback;
  obj = options.obj;
  change = options.change;
  frames = options.frames;
  callback = options.callback;

  var _changeSize = function _changeSize () {
    if (obj.radius + change > 0) {
      obj.radius += change;
    }
      frames -= 1;
    if (frames > 0) {
      obj.nextAnimations.push(_changeSize);
    } else {
      callback && callback();
    }
  };

  obj.nextAnimations.push(_changeSize);
};

Animations.sizePulse = function (obj, change, frames, callback) {
  var secondFrames = frames;
  var secondChange = change * -1;
  Animations.changeSize(obj, change, frames, function () {
    Animations.changeSize(obj, secondChange, secondFrames, callback);
  });
};



var Circle = function (options){
  this.pos = options.pos;
  this.color = options.color || new Color(Circle.COLOR);
  this.radius = options.radius || Circle.RADIUS;
  this.currAnimations = [];
  this.nextAnimations = [];
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
  ctx.stroke();

};
