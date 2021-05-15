const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  suite("convertHandler Functions", function () {
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
});
