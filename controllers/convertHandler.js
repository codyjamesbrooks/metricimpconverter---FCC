function ConvertHandler() {
  this.getNum = function (input) {
    let endOfNumber = input.search(/[a-zA-Z]/);
    let initNumber = input.slice(0, endOfNumber);
    if (initNumber === "") return 1;
    if (initNumber.split("/").length > 2) return "invalid number";

    initNumber = eval(initNumber);
    if (initNumber > 0) return initNumber;
    else return "invalid number";
  };

  this.getUnit = function (input) {
    let startOfUnit = input.search(/[a-zA-Z]/);
    let initUnit = input.slice(startOfUnit);
    if (initUnit === "") return "invalid unit";
    switch (initUnit.toLowerCase()) {
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
        return parseFloat((initNum * galToL).toFixed(5));
      case "L":
        return parseFloat((initNum / galToL).toFixed(5));
      case "mi":
        return parseFloat((initNum * miToKm).toFixed(5));
      case "km":
        return parseFloat((initNum / miToKm).toFixed(5));
      case "lbs":
        return parseFloat((initNum * lbsToKg).toFixed(5));
      case "kg":
        return parseFloat((initNum / lbsToKg).toFixed(5));
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let spellInitUnit = this.spellOutUnit(initUnit);
    let spellReturnUnit = this.spellOutUnit(returnUnit);
    let conversionString = `${initNum} ${spellInitUnit} converts to ${returnNum} ${spellReturnUnit}`;
    return conversionString;
  };
}

module.exports = ConvertHandler;
