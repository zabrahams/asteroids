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
  if (this.red + amount <= 255 && this.red + amount >= 0) {
    this.red += amount;
  }
  if (this.green + amount <= 255 && this.red + amount >= 0) {
    this.green += amount;
  }
  if (this.blue + amount <= 255 && this.red + amount >= 0) {
    this.blue += amount;
  }

  this.update();
  return this;
};

Color.prototype.update = function () {
  var rHex, gHex, bHex;

    rHex = this.red.toString(16);
      if (rHex.length === 1) {
        rHex = "0" + rHex;
      }
    gHex = this.green.toString(16);
      if (gHex.length === 1) {
        gHex = "0" + gHex;
      }
    bHex = this.blue.toString(16);
    if (bHex.length === 1) {
      bHex = "0" + bHex;
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
};
