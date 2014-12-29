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
  this.red += amount;
  this.green += amount;
  this.blue += amount;

  this.update();
  return this;
};

Color.prototype.update = function () {
  var rHex, gHex, bHex;

  if (this.red > 255) {
    rHex = "FF";
  } else if (this.red < 0) {
    rHex = "00";
  } else {
    rHex = this.red.toString(16);
  }

  if (this.green > 255) {
    gHex = "FF";
  } else if (this.green < 0) {
    gHex = "00";
  } else {
    gHex = this.green.toString(16);
  }

  if (this.blue > 255) {
    bHex = "FF";
  } else if (this.blue < 0) {
    bHex = "00";
  } else {
    bHex = this.blue.toString(16);
  }

  this.value = "#" + rHex + gHex + bHex;
  return this;
};

Color.prototype.reset = function () {
  this.red = this.red > 255 ? 255 : this.red;
  this.green = this.green > 255 ? 255 : this.green;
  this.blue = this.blue > 255 ? 255 : this.blue;

  this.red = this.red < 0 ? 0 : this.red;
  this.green = this.green < 0 ? 0 : this.green;
  this.blue = this.blue < 0 ? 0 : this.blue;

}
