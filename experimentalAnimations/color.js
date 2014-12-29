var Color = function (colorStr) {
  this.value = colorStr;
  this.red = parseInt(colorStr.slice(1,3), 16);
  this.green = parseInt(colorStr.slice(3,5), 16);
  this.blue = parseInt(colorStr.slice(5,7), 16);
};

Color.prototype.setR = function (value) {
  this.red = value;
  return this.update();
};

Color.prototype.setG = function (value) {
  this.green = value;
  return this.update();
};

Color.prototype.setB = function (value) {
  this.blue = value;
  return this.update();
};

Color.prototype.brighten = function (amount) {
  var colObj = this;

  var rValue = parseInt(this.red, 16);
  var newRVal = rValue + amount;
  if ((newRVal <= 255) && (newRVal >= 0)){
      this.red = newRVal.toString(16);
      if (this.red.length === 1) {
        this.red = "0" + this.red;
      }
  }

  var gValue = parseInt(this.green, 16);
  var newGVal = gValue + amount;
  if ((newGVal <= 255) && (newGVal >= 0)){
    this.green = newGVal.toString(16);
    if (this.green.length === 1) {
      this.green = "0" + this.green;
    }
  }

  var bValue = parseInt(this.blue, 16);
  var newBVal = bValue + amount;
  if ((newBVal <= 255) && (newBVal >= 0)){
    this.blue = newBVal.toString(16);
    if (this.blue.length === 1) {
      this.blue = "0" + this.blue;
    }
  }

  colObj.update();
  return colObj;
};

Color.prototype.update = function () {
  this.value = "#" + this.red + this.green + this.blue;
  return this;
};
