const chaiHttp = require("chai-http");
const chai = require("chai");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  // Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
  // Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
  // Convert with no number such as kg: GET request to /api/convert.
  suite("Test correct response of valid input to api/convert", function () {
    test("correct response to valid whole number input", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=4gal")
        .end(function (err, res) {
          assert.equal(res.status, 200, "incorrect server res");
          assert.equal(res.body.initNum, 4, "incorrect initNum read");
          assert.equal(res.body.initUnit, "gal", "incorrect initUnit read");
          assert.equal(res.body.returnNum, 15.14164, "incorrect conversion");
          assert.equal(res.body.returnUnit, "L", "incorrect return unit");
          assert.equal(
            res.body.string,
            "4 gallons converts to 15.14164 liters",
            "incorrect string response"
          );
          done();
        });
    });
    test("correct response to valid fraction input", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=1/2km")
        .end(function (err, res) {
          assert.equal(res.status, 200, "incorrect server res");
          assert.equal(res.body.initNum, 0.5, "incorrect initNum read");
          assert.equal(res.body.initUnit, "km", "incorrect initUnit read");
          assert.equal(res.body.returnNum, 0.31069, "incorrect conversion");
          assert.equal(res.body.returnUnit, "mi", "incorrect return unit");
          assert.equal(
            res.body.string,
            "0.5 kilometers converts to 0.31069 miles",
            "incorrect string response"
          );
          done();
        });
    });
    test("correct response to valid decimal input", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=5.4/3lbs")
        .end(function (err, res) {
          assert.equal(res.status, 200, "incorrect server res");
          assert.equal(res.body.initNum, 1.8, "incorrect initNum read");
          assert.equal(res.body.initUnit, "lbs", "incorrect initUnit read");
          assert.equal(res.body.returnNum, 0.81647, "incorrect conversion");
          assert.equal(res.body.returnUnit, "kg", "incorrect return unit");
          assert.equal(
            res.body.string,
            "1.8 pounds converts to 0.81647 kilograms",
            "incorrect string response"
          );
          done();
        });
    });
  });
  suite("Test response of an invalid unit to api/convert", function () {
    test("invalid unit response if unit isn't recognized", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=32g")
        .end(function (err, res) {
          assert.equal(res.status, 200, "incorrect server res");
          assert.equal(
            res.text,
            "invalid unit",
            "incorrect res to unrecognized unit"
          );
          done();
        });
    });
  });
  // Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
  suite("Test response of an invalid number to /api/convert", function () {
    test("invalid number response if number has more than one fraction", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kg")
        .end(function (err, res) {
          assert.equal(res.status, 200, "incorrect server res");
          assert.equal(
            res.text,
            "invalid number",
            "incorrect res to invalid number"
          );
          done();
        });
    });
    test("invalid number response if number is less than 0", function (done) {
      chai
        .request(server)
        .get("/api/convert?input=-5gal")
        .end(function (err, res) {
          assert.equal(res.status, 200, "incorrect server res");
          assert.equal(
            res.text,
            "invalid number",
            "incorrect respose to negative number"
          );
          done();
        });
    });
  });
});
