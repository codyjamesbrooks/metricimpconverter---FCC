const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("convertHandler.getNum Function", function () {
    test(".getNum function reads a whole number", function () {
      assert.equal(
        convertHandler.getNum("1km"),
        1,
        "Incorrectly read whole number"
      );
    });
    test(".getNum function reads a decimal number", function () {
      assert.equal(
        convertHandler.getNum("1.1mi"),
        1.1,
        "Incorrectly reads decimal format"
      );
    });

    let randomNumerator = Math.floor(Math.random() * 10);
    let randomDenomator = Math.floor(Math.random() * 10 + 1);

    let randomFraction = randomNumerator + "/" + randomDenomator;
    let randomDoubleFraction =
      randomFraction + "/" + Math.floor(Math.random() * 10 + 1);

    test(".getNum function reads a fractional number", function () {
      assert.equal(
        convertHandler.getNum("1/2gal"),
        0.5,
        "Incorrectly reads fractional input no space"
      );
      assert.equal(
        convertHandler.getNum(randomFraction + "units"),
        randomNumerator / randomDenomator,
        "Incorrectly read random fractional unit " + randomFraction
      );
    });
    test(".getNum function returns an error on double fraction", function () {
      assert.equal(
        convertHandler.getNum(randomDoubleFraction + "units"),
        "invalid number",
        `failed to return error on random double fraction ${randomDoubleFraction}`
      );
    });
  });
  suite("convertHandler.getUnit Function", function () {
    let validInputs = ["10gal", "1L", "3/4mi", "1.2km", "6lbs", "132kg"];
    let validUnitsKey = ["gal", "L", "mi", "km", "lbs", "kg"];
    test(".getUnit function correctly reads each valid unit", function () {
      for (let i = 0; i < validInputs.length; i++) {
        assert.equal(
          convertHandler.getUnit(validInputs[i]),
          validUnitsKey[i],
          `incorrectly read the units of ${validInputs[i]}`
        );
      }
    });
    test(".getUnit function returns a error for an invalid input", function () {
      assert.equal(
        convertHandler.getUnit("3tbs"),
        "invalid unit",
        "incorrectly handled an invalid unit"
      );
    });
  });
  suite("convertHandler.spellOutUnit Function", function () {
    test(".spellOutUnit returns strings for any valid unit", function () {
      let potentialUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
      let spellPotentialUnits = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      for (let i = 0; i < potentialUnits.length; i++) {
        assert.equal(
          convertHandler.spellOutUnit(potentialUnits[i]),
          spellPotentialUnits[i],
          `incorrectly spelled ${potentialUnits[i]}`
        );
      }
    });
  });
  suite("convertHandler.getReturnUnit Function", function () {
    test(".getReturnUnit converts gal to L", function () {
      assert.equal(
        convertHandler.getReturnUnit("gal"),
        "L",
        "falid to convert gal to L"
      );
    });
    test(".getReturnUnit converts L to gal", function () {
      assert.equal(
        convertHandler.getReturnUnit("L"),
        "gal",
        "falied to convert L to gal"
      );
    });
    test(".getReturnUnit converts mi to km", function () {
      assert.equal(
        convertHandler.getReturnUnit("mi"),
        "km",
        "failed to convert mi to km"
      );
    });
    test(".getReturnUnit converts km to mi", function () {
      assert.equal(
        convertHandler.getReturnUnit("km"),
        "mi",
        "failed to convert km to mi"
      );
    });
    test(".getReturnUnit converts lbs to kg", function () {
      assert.equal(
        convertHandler.getReturnUnit("lbs"),
        "kg",
        "falied to convert lbs to kg"
      );
    });
    test(".getReturnUnit converts kg to lbs", function () {
      assert.equal(
        convertHandler.getReturnUnit("kg"),
        "lbs",
        "failed to convert kg to lbs"
      );
    });
  });
});
