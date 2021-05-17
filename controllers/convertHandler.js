function ConvertHandler() {
  this.inputRegex = /^(\d*\.?\d*\/?\d*\.?\d*)(\w*)?/;

  this.getNum = function (input) {
    let initNumber = input.match(this.inputRegex)[1];
    let initUnit = input.match(this.inputRegex)[2];
    if (!!initNumber && !!initUnit) {
      return eval(initNumber);
    } else {
      return "invalid number";
    }
  };

  this.getUnit = function (input) {
    let initUnit = input.match(this.inputRegex)[2].toLowerCase();
    switch (initUnit) {
      case "gal":
        return "gal";
      case "l":
        return "L";
      case "mi":
        return "mi";
      case "km":
        return "km";
      case "lbs":
        return "lbs";
      case "kg":
        return "kg";
      default:
        return "invalid unit";
    }
  };

  this.getReturnUnit = function (initUnit) {
    switch (initUnit) {
      case "gal":
        return "L";
      case "L":
        return "gal";
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
    }
  };

  this.spellOutUnit = function (unit) {
    switch (unit) {
      case "gal":
        return "gallons";
      case "L":
        return "liters";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
    }
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch (initUnit) {
      case "gal":
        return initNum * galToL;
      case "L":
        return initNum / galToL;
      case "mi":
        return initNum * miToKm;
      case "km":
        return initNum / miToKm;
      case "lbs":
        return initNum * lbsToKg;
      case "kg":
        return initNum / lbsToKg;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let spellInitUnit = this.spellOutUnit(initUnit);
    let spellReturnUnit = this.spellOutUnit(returnUnit);
    let conversionString = `${initNum} ${spellInitUnit} converts to ${returnNum} ${returnUnit}`;
    return conversionString;
  };
}

module.exports = ConvertHandler;
