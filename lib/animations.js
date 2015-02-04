(function (){
  if (typeof window.Animations === "undefined") {
    window.Animations = {};
  }

Animations.changeBrightCol = function (options) {
  var obj, color, change, frames, callback;
  obj = options.obj;
  color = options.color;
  change = options.change;
  frames = options.frames;
  callback = options.callback;

  var _changeBright = function _changeBright () {
    if ((obj.outerColor[color] + change <= 255) && (obj.outerColor[color] + change >= 0)) {
      obj.outerColor[color] += change;
      obj.outerColor.update();
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

  var changeFrames = Animations.getColFrames(obj.outerColor[color], change);
  if (changeFrames > frames) {
    changeFrames = frames;
  }
  var holdFrames = frames - changeFrames;

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
  var obj, change, frames, callback;
  obj = options.obj;
  change = options.change;
  frames = options.frames;
  callback = options.callback;

  ["red", "green", "blue"].forEach(function(col) {
    if (col === "blue" || col === "green") {
      callback = undefined;
    }
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

  darkFrames = frames - 1;
  darkChange = change *-1

  Animations.changeBright({
    obj: obj,
    change: change,
    frames: frames,
    callback: function () {
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

Animations.sizePulse = function (options) {
  var obj, change, frames, callback;
  obj = options.obj;
  change = options.change;
  frames = options.frames;
  callback = options.callback;

  var secondFrames = frames;
  var secondChange = change * -1;
  Animations.changeSize({
    obj: obj,
    change: change,
    frames: frames,
    callback: function () {
      Animations.changeSize({
        obj: obj,
        change: secondChange,
        frames: secondFrames,
        callback: callback
      });
    }
  });
};

})();
