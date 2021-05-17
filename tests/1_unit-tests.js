const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("convertHandler.getNum Function", function () {
    // convertHandler should correctly read a whole number input.
    test(".getNum function reads a whole number", function () {
      assert.equal(
        convertHandler.getNum("1km"),
        1,
        "Incorrectly read whole number, 1 digit no space"
      );
      assert.equal(
        convertHandler.getNum("20 lbs"),
        20,
        "Incorrectly read whole number, 2 digit 1 space"
      );
    });

    // convertHandler should correctly read a decimal number input.
    test(".getNum function reads a decimal number", function () {
      assert.equal(
        convertHandler.getNum("1.1miles"),
        1.1,
        "Incorrectly reads decimal format no space"
      );
      assert.equal(
        convertHandler.getNum(".1 L"),
        0.1,
        "Incorrectly reads decimal format 1 space"
      );
    });

    let randomNumerator = Math.floor(Math.random() * 10);
    let randomDenomator = Math.floor(Math.random() * 10 + 1);
    let randomFractionInput = randomNumerator + "/" + randomDenomator + " unit";
    // convertHandler should correctly read a fractional input.
    test(".getNum function reads a fractional number", function () {
      assert.equal(
        convertHandler.getNum("1/2gal"),
        0.5,
        "Incorrectly reads fractional input no space"
      );
      assert.equal(
        convertHandler.getNum("3/4 miles"),
        0.75,
        "Incorrectly reads fractional input 1 space"
      );
      assert.equal(
        convertHandler.getNum(randomFractionInput),
        randomNumerator / randomDenomator,
        "Incorrectly read random fractional unit " + randomFractionInput
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
});
