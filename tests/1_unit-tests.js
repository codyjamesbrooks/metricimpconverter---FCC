const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("convertHandler correctly reads a whole number input", function () {
    assert.equal(
      convertHandler.getNum("3mi"),
      3,
      "incorrectly read whole number input"
    );
  });

  test("convertHandler correctly reads a decimal number input", function () {
    assert.equal(
      convertHandler.getNum("1.5kg"),
      1.5,
      "Incorrectly read decimal number input"
    );
  });

  test("convertHandler correctly reads a fractional input", function () {
    assert.equal(
      convertHandler.getNum("3/4lbs"),
      0.75,
      "Incorrectly read factional input"
    );
  });

  test("convertHandler correctly reads a fractional input wih decimal", function () {
    assert.equal(
      convertHandler.getNum("1.5/3gal"),
      0.5,
      "Incorrectly read fraction with decimal"
    );
  });

  test("convertHandler returns invalid number on a double-fraction", function () {
    assert.equal(
      convertHandler.getNum("3/2/2L"),
      "invalid number",
      "failed to return error on double-fraction"
    );
  });

  test("convertHandler defaults to 1 when no numerical input is provided", function () {
    assert.equal(
      convertHandler.getNum("L"),
      1,
      "failed to default to 1 in the absence of numerical input"
    );
  });

  let validUnitInput = [
    "gal",
    "GAL",
    "L",
    "l",
    "kg",
    "KG",
    "lbs",
    "LBS",
    "mi",
    "MI",
    "km",
    "KM",
  ];
  let validUnitInputKey = ["gal", "L", "kg", "lbs", "mi", "km"];
  let validReturnUnitKey = ["L", "gal", "lbs", "kg", "km", "mi"];
  let validSpelledUnitKey = [
    "gallons",
    "liters",
    "kilograms",
    "pounds",
    "miles",
    "kilometers",
  ];
  test("convertHandler correctly reads valid input units", function () {
    for (let i = 0; i < validUnitInput.length; i++) {
      assert.equal(
        convertHandler.getUnit(validUnitInput[i]),
        validUnitInputKey[Math.floor(i / 2)],
        `failed to convert ${validUnitInput[i]} to ${
          validUnitInputKey[Math.floor(i / 2)]
        }`
      );
    }
  });

  test("convertHandler returns invalid unit when invalid unit is provided", function () {
    assert.equal(
      convertHandler.getUnit("1burp"),
      "invalid unit",
      "failed to return error on invalid unit"
    );
  });

  test("convertHandler returns correct return unit for valid input unit", function () {
    let inputUnit;
    for (let i = 0; i < validUnitInput.length; i++) {
      inputUnit = convertHandler.getUnit(validUnitInput[i]);
      assert.equal(
        convertHandler.getReturnUnit(inputUnit),
        validReturnUnitKey[Math.floor(i / 2)],
        `failed to respond to ${validUnitInput[i]} with ${
          validReturnUnitKey[Math.floor(i / 2)]
        }`
      );
    }
  });

  test("convertHandler returns correct spelled-out string for each valid input", function () {
    let inputUnit;
    for (let i = 0; i < validUnitInput.length; i++) {
      inputUnit = convertHandler.getUnit(validUnitInput[i]);
      assert.equal(
        convertHandler.spellOutUnit(inputUnit),
        validSpelledUnitKey[Math.floor(i / 2)],
        `failed to spell out ${inputUnit} as ${
          validSpelledUnitKey[Math.floor(i / 2)]
        }`
      );
    }
  });

  test("convertHandler correctly converts gal to L", function () {
    assert.equal(
      convertHandler.convert(1, "gal"),
      3.78541,
      "incorrect gallon to liter conversion"
    );
  });

  test("convertHandler correctly converts L to gal", function () {
    assert.equal(
      convertHandler.convert(1, "L"),
      0.26417,
      "incorrect liter to gallon conversion"
    );
  });

  test("convertHandler correctly converts mi to km", function () {
    assert.equal(
      convertHandler.convert(1, "mi"),
      1.60934,
      "incorrect miles to kilometers conversion"
    );
  });

  test("convertHandler correctly converts km to mi", function () {
    assert.equal(
      convertHandler.convert(1, "km"),
      0.62137,
      "incorrect kilometers to miles conversion"
    );
  });

  test("convertHandler correctly converts lbs to kg", function () {
    assert.equal(
      convertHandler.convert(1, "lbs"),
      0.45359,
      "incorrect pounds to kilograms conversion"
    );
  });

  test("convertHandler correctly converts kg to lbs", function () {
    assert.equal(
      convertHandler.convert(1, "kg"),
      2.20462,
      "incorrect kilograms to pounds conversion"
    );
  });
});
